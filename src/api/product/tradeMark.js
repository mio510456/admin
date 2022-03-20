// 获取品牌管理的数据
import request from '@/utils/request';
// 获取品牌列表接口
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'});

// 处理添加品牌
// 新增品牌：/admin/product/baseTrademark/save post请求   携带两个参数 品牌名称和logo
// 切记：对于新增品牌，给服务器传数据不要传ID，服务器会自动生成

// 修改品牌
// /admin/product/baseTrademark/update put  多携带一个参数 id
// 切记： 带上id告诉服务器修改的是哪一个品牌

export const reqAddOrUpdateTradeMark = (tradeMark) => {
  // 带给服务器数据携带ID --- 修改
  if (tradeMark.id) {
    return request({url:'/admin/product/baseTrademark/update', method: 'put', data:tradeMark });
  } else {
    // 新增品牌
    return request({url:'/admin/product/baseTrademark/save', method: 'post', data: tradeMark });
  }
}

// 删除品牌
// /admin/product/baseTrademark/remove/{id}

export const reqDeleteTradeMark = (id) => request({url:`/admin/product/baseTrademark/remove/${id}`, method: 'delete'});
