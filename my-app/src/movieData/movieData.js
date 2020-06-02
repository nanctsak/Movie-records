import React, { Component } from 'react';
import { Input, Button, Select, Table, Modal, Row, Col } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './movieData.css';
const { Option } = Select;
const { confirm } = Modal;
const api = "http://localhost:9000/api/movie";


class MovieData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            yearreleased: null,
            rating: "",
            dataMovie: null,
            visible: false

        }


    }



    componentWillMount = () => {
        this.showData();
    }
    addmovie = () => {
        fetch(api + "/", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                yearreleased: this.state.yearreleased,
                rating: this.state.rating
            })
        })
        .then(res => res.json())
        .then(res =>{
            if (res.success === true){
                console.log("เพิ่มข้อมูลเรียบร้อย")
                window.location.reload();
            }
        })
        .catch(err => console.log("error = ",err))
       
    }
    showData = () => {
        fetch(api + "/", {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(respone => respone.json())
            .then(respone => {
                this.setState({
                    dataMovie: respone
                })
                console.log("datamovie", respone)
            })
    }
    editDataMovie = (data) => {
        console.log("dataedit", data)
        this.setState({
            updateName: data.name,
            updateYearreleased: data.yearreleased,
            updateRating: data.rating,
            idUpdate: data._id,
            visible: true,
        });

    }
    updateData = (id) => {
        fetch(api + "/" + id, {
            method: "put",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.updateName,
                yearreleased: this.state.updateYearreleased,
                rating: this.state.updateRating
            })
        })
        .then(res => res.json())
        .then(res =>{
            if (res.success === true){
                console.log("อัพเดทข้อมูลเรียบร้อย")
                window.location.reload();
            }
        })
        .catch(err => console.log("error = ",err))
        
    }

    deleteDataMovie = (id) => {
        this.showDeleteConfirm(id);
    }
    showDeleteConfirm = (id) => {
        console.log("id", id)
        confirm({
            title: 'Are you sure delete this data?',
            icon: <ExclamationCircleOutlined />,
            //   content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                fetch(api + "/" + id, {
                    method: "delete",
                    headers: {
                        "content-type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(res =>{
                    if (res.success === true){
                        console.log("ลบข้อมูลเรียบร้อย")
                        window.location.reload();
                    }
                })
                .catch(err => console.log("error = ",err))
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }



    handleChangeName = e => {
        this.setState({ name: e.target.value });
    }
    handleChangeYearReleased = e => {
        this.setState({ yearreleased: e.target.value });
    }
    handleChangeRating = e => {
        this.setState({ rating: e })
    }
    handleChangeUpName = e => {
        this.setState({ updateName: e.target.value });
    }
    handleChangeUpYearReleased = e => {
        this.setState({ updateYearreleased: e.target.value });
    }
    handleChangeUpRating = e => {
        this.setState({ updateRating: e })
    }
    handleOk = e => {
        this.setState({
            visible: false,
        });
        const idUpdate = this.state.idUpdate
        this.updateData(idUpdate);
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const columns = [
            {
                title: "Movie Title",
                dataIndex: "name",
                key: "name",
                width: "35%"
            },
            {
                title: "Year Released",
                dataIndex: "yearreleased",
                key: "yearreleased",
                sorter: {
                    compare: (a, b) => a.yearreleased - b.yearreleased,
                },
                width: "20%"
            },
            {
                title: "Rating",
                dataIndex: "rating",
                key: "rating",
                // filters: [
                //     { text: 'G', value: 'G' },
                //     { text: 'PG', value: 'PG' },
                //     { text: 'M', value: 'M' },
                //     { text: 'MA', value: 'MA' },
                //     { text: 'R', value: 'R' },
                //   ],
            },
            {
                title: "Action",
                key: "action",
                render: record => (
                    <span>
                        <Button onClick={() => this.editDataMovie(record)}>Edit</Button>
                        <Button type="primary" danger onClick={() => this.deleteDataMovie(record._id)}>Delete</Button>
                    </span>
                )
            }
        ];
        return (

            <div className="body">
                <h2 className="title">Movie</h2>
                <Row>
                    <Col span={5}></Col>
                    <Col span={12}>
                        <div className="movieRecords">
                            <div style={{ width: "80%" }}>
                                <h1 style={{ fontSize: "40px", fontWeight: "1000" }}>Movie Records</h1>
                                <hr></hr>
                            </div>

                            <br></br>
                            <div>
                                <div className= "titleAddmovie">
                                    <h2 style ={{ color: "white"}}>Add movie info</h2>
                                </div>
                                <div className="addMoviedata">
                                    <span>
                                        <Input
                                         
                                            type="text"
                                            style={{ width: '30%' }}
                                            placeholder="Movie Title"
                                            onChange={this.handleChangeName}
                                        />
                                        <Input
                                            style={{ width: '20%', marginLeft: "5%" }}
                                            placeholder="Year Released"
                                            onChange={this.handleChangeYearReleased}
                                        />
                                        <Select defaultValue="Rating" style={{ width: '20%', marginLeft: "5%" }}
                                            onChange={this.handleChangeRating}>
                                            <Option value="G">G</Option>
                                            <Option value="PG">PG</Option>
                                            <Option value="M">M</Option>
                                            <Option value="MA">MA</Option>
                                            <Option value="R">R</Option>
                                        </Select>
                                        <Button type="primary" style={{ marginLeft: "5%" }} onClick={this.addmovie}>Save</Button>
                                    </span>
                                </div>

                                <div>
                                    <div className="ShowData">
                                        <Table className="tabledata" columns={columns}
                                            rowKey={record => record._id} dataSource={this.state.dataMovie} pagination={{ pageSize: 10 }} />
                                    </div>
                                </div>
                                <Modal  
                                    className="modelEdit"
                                    title="EDIT"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                >

                                    <Row>
                                        <Col span={10}> <h3>Movie Title</h3></Col>
                                        <Col span={7}><h3>Year Released</h3></Col>
                                        <Col span={3}><h3>Rating</h3></Col>
                                    </Row>
                                    <span>
                                        <Input
                                            type="text"
                                            style={{ width: '40%' }}
                                            placeholder="Movie Name"
                                            onChange={this.handleChangeUpName}
                                            value={this.state.updateName}
                                        />
                                        <Input
                                            style={{ width: '20%', marginLeft: "5%" }}
                                            placeholder="Year Released"
                                            onChange={this.handleChangeUpYearReleased}
                                            value={this.state.updateYearreleased}
                                        />
                                        <Select defaultValue="Rating" style={{ width: '20%', marginLeft: "5%" }}
                                            onChange={this.handleChangeUpRating}
                                            value={this.state.updateRating}>
                                            <Option value="G">G</Option>
                                            <Option value="PG">PG</Option>
                                            <Option value="M">M</Option>
                                            <Option value="MA">MA</Option>
                                            <Option value="R">R</Option>
                                        </Select>


                                    </span>
                                </Modal>
                            </div>
                        </div>
                    </Col>
                    <Col span={3}></Col>


                </Row>
            </div>

        )
    }
}
export default MovieData;


