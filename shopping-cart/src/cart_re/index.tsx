import React from 'react'
import './index.css'
import { List, Typography } from 'antd'

// https://juejin.im/post/5e5a57b0f265da575b1bc055
export function Cart() {

  type CheckedMap = {
    [id: number]: boolean
  }
  interface CartItem {
    id: number
    name: string
    price: number
  }
  interface Props {
    item: CartItem
    checked: boolean
    onCheckedChange: OnCheckedChange<CartItem>
  }

  
  type OnCheckedChange<T> = (item:T, checked: boolean) => any
  const cartData = Array(5)
  .fill(undefined)
  .map((v, i) => ({
    id: i,
    name: `商品${i}`,
    price: Math.round(Math.random() * 100),
  }))
  // 商品勾选
  const [checkedMap, setCheckedMap] = React.useState<CheckedMap>({})
  const onCheckedChange: OnCheckedChange<CartItem> = (cartItem, checked) => {
    const { id } = cartItem
    const newCheckedMap = Object.assign({}, checkedMap, {
      [id]: checked,
    })
    setCheckedMap(newCheckedMap)
  }
  
  // cartItems的积分总和
  const sumPrice = (cartItems: CartItem[]) => {
    return cartItems.reduce((sum, cur) => sum + cur.price, 0)
 }
// 返回已选中的所有cartItems
const filterChecked = () => {
  return (
    Object.entries(checkedMap)
      // 通过这个filter 筛选出所有checked状态为true的项
      .filter(entries => Boolean(entries[1]))
      // 再从cartData中根据id来map出选中列表
      .map(([checkedId]) => cartData.find(({ id }) => id === Number(checkedId))).filter(Boolean) as []
  )
}
  // 计算礼享积分
  const calcPrice = () => {
    return sumPrice(filterChecked())
  }
// 全选
const checkedAll = cartData.length !== 0 && filterChecked().length === cartData.length
const onCheckedAllChange = (newCheckedAll:any) => {
  // 构造新的勾选map
  let newCheckedMap: CheckedMap = {}
  // 全选
  if (newCheckedAll) {
    cartData.forEach(cartItem => {
      newCheckedMap[cartItem.id] = true
    })
  }
  // 取消全选的话 直接把map赋值为空对象
  setCheckedMap(newCheckedMap)
}


  const Footer = (
    <div className="footer">
      <div className="check-all">
        <input
          checked={checkedAll}
          onChange={onCheckedAllChange}
          type="checkbox"
        />
        全选
      </div>
      <div>
        价格总计 <Typography.Text mark>${calcPrice}</Typography.Text>
      </div>
    </div>
  )
  function areEqual(prevProps: Props, nextProps: Props) {
    console.log(prevProps,nextProps );
    return (
      prevProps.checked === nextProps.checked
    )
  }
  const ItemCard = React.memo((props: Props) => {
    console.log('cart item rerender')
    const { item, checked, onCheckedChange } = props
    const { name, price } = item
  
    const onWrapCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target
      onCheckedChange(item, checked)
    }
    
    return (
      <div className="item-card">
        <div className="checkbox-wrap">
          <input
            type="checkbox"
            checked={checked}
            onChange={onWrapCheckedChange}
          />
        </div>
        <p className="item-info">
          {name} <Typography.Text mark>${price}</Typography.Text>
        </p>
      </div>
    )
  }, areEqual)

  return (
    <div className="cart">
            <List
        header={<div>购物车</div>}
        footer={Footer}
        bordered
        dataSource={cartData}
        renderItem={item => {
          const checked = checkedMap[item.id] || false
          return (
            <List.Item>
              <ItemCard item={item} checked={checked} onCheckedChange={onCheckedChange}/>
            </List.Item>
          )
        }}
      />
    </div>
  )
}