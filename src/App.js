import React, { Component } from "react";
import './App.css';
import './container_css.scss';


class App extends Component {
  
  //"init"
  constructor(props){
    super(props);
    this.state = {
      description_input: "",
      price_input: "",
      count: 0,
      data_array: [],
      input_date: "",
      input_time: ""
    }
  }

  //JS Functions
  update_attribute(key, value){
    //Update the state
    this.setState({
      [key]: value
    })
  }
  
  update_dataframe(){
    //First get time_stamps
    const timestamp = Date.now();
    const instance_date = Intl.DateTimeFormat(
      'en-US', {
        year: 'numeric', month: '2-digit',day: '2-digit'
      }).format(timestamp);
    const instance_time = Intl.DateTimeFormat(
      'en-US', {
        hour: '2-digit', minute: '2-digit'
      }).format(timestamp);



    const updated_count=this.state.count + 1;
    const new_data_point={
      id: updated_count,
      description_val: this.state.description_input,
      price_val: parseFloat(this.state.price_input),
      input_date: instance_date,
      input_time: instance_time
    };

    const new_data_array = [...this.state.data_array];
    new_data_array.push(new_data_point);
    this.setState({
      description_input: "",
      price_input: "",
      count: updated_count,
      data_array: new_data_array
    })
  }
  
  delete_row(id){
    const full_array = [...this.state.data_array];
    const updated_array = full_array.filter(item => item.id !== id);
    this.setState({
      data_array: updated_array
    })
  }

  
  //JSX and HTML
  render() {
    return (
      <div className="App">

        <div id='Header and inputs'>
          <header className='App-header'>
            <h1 className='App-title'>
              Credit Card Balance Tracker
            </h1>
          </header>
          <br/>
          <div id='inputs'>
            Input:&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              placeholder="Description"
              value={this.state.description_input}
              onChange={e => this.update_attribute("description_input", e.target.value)}
            />
            <input
              type="text"
              placeholder="Amount"
              value={this.state.price_input}
              onChange={e => this.update_attribute("price_input", e.target.value)}
            />
            <button onClick={() => this.update_dataframe()}>
              Add Transaction
            </button>
            <br/>
            <hr size="3" width="100%" color="black"></hr>  
          </div>
        </div>
        
        <div id='Summary Stats' class="table-container" role="table" aria-label="Destinations">
          <div class="flex-table header" role="rowgroup">
            <div class="flex-row" role="columnheader">Number of Charges</div>
            <div class="flex-row" role="columnheader">Total Balance</div>
          </div>
          <div class="flex-table row" role="rowgroup">
            <div class="flex-row" role="columnheader">{this.state.data_array.length}</div>
            <div class="flex-row" role="columnheader">
              {
                this.state.data_array.reduce((a,v) =>  a = a + v.price_val , 0 ).toLocaleString(
                  'en-US',
                  {
                    style: 'currency',
                    currency: 'USD'
                  }
                )
              }
            </div>
          </div>
        </div>

        <div id='Ledger' class="table-container" role="table" aria-label="Destinations">
          <div class="flex-table header" role="rowgroup">
            <div class="flex-row" role="columnheader">Date</div>
            <div class="flex-row" role="columnheader">Time Stamp</div>
            <div class="flex-row" role="columnheader">Description</div>
            <div class="flex-row" role="columnheader">Amount</div>
            <div class="flex-row" role="columnheader">Delete</div>
          </div>
          <div>{this.state.data_array.map(
            item => {
              return(
                <div class="flex-table row" role="rowgroup">
                  <div class="flex-row" role="cell">{item.input_date}</div>
                  <div class="flex-row" role="cell">{item.input_time}</div>
                  <div class="flex-row" role="cell">{item.description_val}</div>
                  <div class="flex-row" role="cell">{
                    item.price_val.toLocaleString(
                      'en-US',
                      {style: 'currency',currency: 'USD'}
                      )
                    }</div>
                  <div class="flex-row" role="columnheader">
                    <button
                      onClick={() => this.delete_row(item.id)}
                    >
                      Delete
                    </button></div>
                </div>
            )})}
          </div>
        </div>       

      </div>
    )
  }
}
export default App;