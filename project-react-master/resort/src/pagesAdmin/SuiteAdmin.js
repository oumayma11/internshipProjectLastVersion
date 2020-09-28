import React, { Component } from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import NavbarAdmin from "../components/NavbarAdmin";

class SuiteAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

    }

    onChangeHandler = event => {

        console.log(event.target.files[0])

    }

    onSubmit(e, id) {
        e.preventDefault();
        fetch("/room/deleteRoom/" + id, {
            "method": "DELETE",
            "headers": {
                "x-rapidapi-host": "fairestdb.p.rapidapi.com",
                "accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            //console.log(id)
            .then(response => response.text())
            .then(response => {
                console.log(response)
                window.location.reload();
                // this.props.history.push('/profile')
            })
            .catch(err => {
                console.log(err);
            });
        //console.log(id)

    }


    componentDidMount() {
        fetch('/room/suite')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    items: result,

                });
            });

        this.count();

    }


    count() {
        fetch("/room/countRoomSuiteAvailable/", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "fairestdb.p.rapidapi.com",
                "accept": "application/json",
                "Content-Type": "application/json",
            },

        })
            .then(response => {
                response.json()
}
)
            .then(response => {
                console.log(response)


            })
            .catch(err => {
                console.log(err);
            });


        //console.log(id)

    

    }


    render() {
        const { items } = this.state;


        return (


            <>
                <NavbarAdmin/>
                <Hero hero="roomsHero">
                    <Banner title="Suite Rooms">

                    </Banner>
                </Hero>
                <Container fluid className="main-content-container px-4">
                    {/* Page Header */}


                    {/* Default Light Table */}
                    <Row>
                        <Col>
                            <Card small className="mb-4">

                                <CardBody className="p-0 pb-3">
                                    <table className="table mb-0">
                                        <thead className="bg-light">
                                            <tr>
                                                <th scope="col" className="border-0">
                                                    #
            </th>
                                                <th scope="col" className="border-0">
                                                    roomType
            </th>
                                                <th scope="col" className="border-0">
                                                    image
            </th>
                                                <th scope="col" className="border-0">
                                                    nbRoomAvailable
            </th>
                                                <th scope="col" className="border-0">
                                                    price
            </th>
                                                <th scope="col" className="border-0">

                                                </th>

                                            </tr>
                                        </thead>

                                        <tbody>


                                            {items.map(item => (
                                                


                                                <tr key={item.id}>
                                                    <td>{item.id}
                                                        {localStorage.setItem('roomid', item.id)}
                                                    </td>
                                                    <td>{item.roomType}              {localStorage.setItem('roomtype', item.roomType)}

                                                    </td>
                                                    <td >
                                                        <img src={require(`../upload/${item.image}`)} alt={item.image} width="200" height="90" />
                                                        {localStorage.setItem('image', item.image)}

                                                    </td>



                                                    <td>{item.nbRoomAvailable}</td>
                                                    <td>{item.price}</td>
                                                    <td>  <Button type="submit" onClick={(e) => this.onSubmit(e, item.id)} >Delete</Button></td>
                                                
                                                </tr>

                                            ))}
                                        </tbody>
                                    </table>


                                </CardBody>
                            </Card>
                           

                        </Col>
                    </Row>

                </Container>
            </>
        );
    }
}

const Rooms = () => {
    return (
        <>
            <Hero hero="roomsHero">
                <Banner title="Suite Rooms">
                   
                </Banner>
            </Hero>

        </>
    );
};

export default SuiteAdmin;