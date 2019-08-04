import React, { Component } from 'react';
import './Consumir_productos.scss';


export default class Consumir_productos extends Component {
    state = {
        urlApi: 'https://api.mercadolibre.com/sites/MCO/search?q=',
        urlApiSeller: 'https://api.mercadolibre.com/users/',
        urlApiProducto: 'https://api.mercadolibre.com/items/', 
        productName: '',
        imagenes: '',
        busqueda: '',
        productos: '',
        vendedores: ''
    }

    componentDidMount() {
        this.getConsumir();
    }
    componentDidUpdate(prevProps, prevState) {
        const { productName: prevProductName } = prevState;
        const { productName } = this.state;
        if (prevProductName !== productName) this.getConsumir();
    }

    getConsumir = async () => {
        const { urlApi, urlApiSeller,urlApiProducto, productName } = this.state;
        const resp = await fetch(urlApi + productName);
        const data = await resp.json();
        const sellers = [];
        const items = [];
        for (var index in data.results) {
            const resp1 = await fetch(urlApiSeller + data.results[index].seller.id);
            const data1 = await resp1.json();
            const resp2 = await fetch(urlApiProducto + data.results[index].id);
            const data2 = await resp2.json();
            sellers.push(data1.nickname);
            items.push(data2.pictures[0].url);
        }
        try {
            this.setState({
                titulo: data.results[0].title,
                imagenes: items,
                productos: data.results,
                vendedores: sellers
            });

        } catch (error) {

        }
    }
    handleEdit = (event) => {
        const eventValue = event.target.value;
        if (eventValue !== null) {
            this.setState({ busqueda: event.target.value })
        }
    }

    actualizarProducto = () => {
        this.setState({ productName: this.state.busqueda })
    }

    render() {
        const elements = this.state.productos;
        const items = [];
        var i = 0;
        for (var index of elements) {
            items.push(
                <div id="container">
                    <div class="product-details">

                        <h1>{index.title}</h1>

                        <p class="information">Vendedor: {this.state.vendedores[i]}</p>

                        <div class="control">

                            <button class="btn">
                                <a href={index.permalink} class="class_a_href"> 
                                    <span class="price">{index.price}$</span>
                                    <span class="shopping-cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>  
                                                             
                                    <span class="buy">Comprar</span>
                                </a>
                            </button>

                        </div>

                    </div>


                    <div class="product-image">

                        <img src={this.state.imagenes[i]} alt="Omar Dsoky" />

                        <div class="info">
                            <h2>Informacion</h2>
                            <ul>
                                <li><strong>Lugar: </strong>{index.address.state_name}</li> 
                                <li><strong>{index.attributes[0].name} :</strong>{index.attributes[0].value_name}</li>
                                <li><strong>{index.attributes[1].name} : </strong>{index.attributes[1].value_name}</li>
                                <li><strong>{index.attributes[2].name} : </strong>{index.attributes[2].value_name}</li>
                            </ul>
                        </div>
                    </div>

                </div>
            )
            i++;
        }

        return (

               
                <div>
                    <h6 class= "h6">HECTOR GUERRA</h6>
                    <div class="box">
                        <div class="container-1">
                            <input type="search" id="search" placeholder="Search..." onChange={this.handleEdit} />
                            <button onClick={this.actualizarProducto}>Search</button>
                        </div>
                        
                    </div>
                    <div>
                        {items}
                    </div>
                </div>
                )
            }
}