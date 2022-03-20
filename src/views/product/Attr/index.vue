<template>
  <div>
    <el-card style="margin: 20px 0">
      <category-select @getCategoryId="getCategoryId" :show="!isShowTable"></category-select>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 15px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
            ></el-button>
            </template>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="70px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
        <el-table border style="width: 100%;margin:20px 0px" :data="attrInfo.attrValueList">
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column width="width" prop="prop" label="属性值名称">
            <template slot-scope="{row, $index}">
              <!-- span input来回切换  -->
              <el-input v-model="row.valueName" size="mini" placeholder="请输入属性值名称" v-if="row.flag" @blur="toLook(row)" @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
              <span v-else @click="toEdit(row,$index)" style="display:block">{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column width="width" prop="prop" label="操作">


            <!-- 问题1 -->
            <template slot-scope="{row, $index}">
              <el-popconfirm :title="`确定删除${row.valueName}?`" @onConfirm="deleteAttrValue($index)">
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入lodash当中的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 接收平台属性的字段
      attrList: [],
      isShowTable: true,
      // 收集新增属性|修改属性使用的
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [ //属性值
          // {
          //   attrId: 0, //相应的属性名的id
          //   valueName: "string",
          // }
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 3, // 因为服务器也需要区分几级id
      },
    };
  },
  methods: {
    // 自定义事件的回调
    getCategoryId({categoryId, level}) {
      // 区分三级分类相应的id，以及父组件进行存储
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        // 代表三级分类的id有了
        this.category3Id = categoryId;
        // 发请求
        this.getAttrList();
      }
    },
    // 获取平台属性的值
    // 当用户确定三级数据向平台获取数据
    async getAttrList() {
      // 获取分类的ID
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      console.log(result);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值回调
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId:this.attrInfo.id,  //对于修改某一个属性的时候，可以在已有属性的基础上新增属性值(带上原有的ID)
        valueName:'',
        flag: true
      })
      this.$nextTick(()=> {
        this.$refs[this.attrInfo.attrValueList.length-1].focus()
      })
    },
    // 添加属性按钮的回调
    addAttr() {
      this.isShowTable = false

      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [ //属性值
          // {
          //   attrId: 0, //相应的属性名的id
          //   valueName: "string",
          // }
        ],
        categoryId: this.category3Id, //三级分类的id
        categoryLevel: 3, // 因为服务器也需要区分几级id
      }
    },
    // 修改某一个属性
    updateAttr(row) {
      this.isShowTable = false
      // 由于数据结构当中存在对象里面套数组，数组里面有套对象，因此需要使用深拷贝解决此类问题
      this.attrInfo= cloneDeep(row)
      // 在修改某一个属性的时候，将相应的属性值元素添加上flag这个标签
      this.attrInfo.attrValueList.forEach(item => {
        // 第一个参数：对象 第二个参数：添加新的响应式属性 第三参数 新的属性的属性值
        this.$set(item,'flag',false)
      })
    },
    // 失去焦点的时间，切换为查看模式，展示span
    toLook(row) {
      // 如果属性值为空不能作为新的属性值，需要给用户提示，让他输入一个其他的属性值
      if (row.valueName.trim()=='') {
        this.$message('请你输入一个正常的属性值')
        return
      }
      // 新增的属性值不能与已有的属性值重复
      let isRepat = this.attrInfo.attrValueList.some(item => {
        // 需要将row从数组里面判断的时候去除
        // row最新新增的属性值【数组的最后一项元素】
        // 判断的时候，需要把已有的数组当中新增的这个属性值去除
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });

      if (isRepat) return
      row.flag = false
    },
    toEdit(row,index) {
      row.flag=true
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index,1)
    },
    async addOrUpdateAttr() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if (item.valueName != '') {
          delete item.flag
          return true
        }
      })
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.isShowTable = true
        this.$message({type:'success',message:'保存成功'})
        this.getAttrList()
      } catch (error) {
        this.$message('保存失败')
      }
    }
  },
};
</script>

<style scoped>
</style>