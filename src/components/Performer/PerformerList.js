import React, { Component } from 'react';
import request from 'superagent';
import PerformanceCard from '../PerformanceCard';
import './PerformerList.scss';

const URL = 'https://node.gigleapp.com/search';

class PerformerList extends Component {

  state = { products: null };

  componentDidMount() {
    request
      .post(URL)
      .send({
        action: "getProductList",
        data: "-KsYlXgMj3S6uDIJCPuO,-KyRuPsRePD02DhR0MzF"
      })
      .end((err, res) => {
        this.setState({ products: res.body.products })
      })
  }

  render() {
    const { products } = this.state;
    let performanceList = 
      products
      ?
      products.map(product => {
        const {id, productImage, title, performerData, price, duration, setupTime, performers} = product;
        return(
          <PerformanceCard
            key={id}
            data={{
              image:productImage,
              title,
              // link={},
            }}
            performerName={performerData.name}
            performerIcon={performerData.icon}
            price={price}
            title={title}
            duration={duration}
            performers={performers}
          />
        )
      })
      : null
                  
    console.log(this.state.products)
    return (
      <div>
        <h1>Esiintyjat</h1>
        <div className='performance-list'>
          {performanceList}
          {performanceList}
        </div>
      </div>
    )
  }
}

export default PerformerList;
