import React from 'react';
// import { Cart } from './cart_re/index'
import Cart from './cart/index'
import { Counter, MeasureExample } from './ref-'
import {ReCounter} from './reducer'
import 'antd/dist/antd.css'
function App() {
  return (
    <div className="App">
      <Cart />
      <Counter />
      <MeasureExample />
      <ReCounter/>
    </div>
  );
}

export default App;
