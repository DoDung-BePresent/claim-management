import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, Button, Table, Modal, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../index.css';
import Header from '../../components/layout/Header';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ProjectManagement = () => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const onFinish = (values) => {
    console.log('Success:', values);
    setModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleDelete = (id) => {
    // confirm({
    //   title: 'Are you sure you want to delete this user?',
    //   onOk() {
    //     console.log('OK');
    //   },
    // });
    console.log('Deleted project with key:', key);
  };

  const showSaveConfirm = () => {
    confirm({
      title: 'Are you sure you want to save the changes?',
      onOk() {
        form.submit();
      },
      onCancel() {
        console.log('Save cancelled');
      },
      okText: 'Yes',
      cancelText: 'No',
    })
  };

  const showModal = (title) => {
    setModalTitle(title);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const columns = [
    { title: 'Project Name', dataIndex: 'projectName', key: 'projectName' },
    { title: 'Project Code', dataIndex: 'projectCode', key: 'projectCode' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration' },
    { title: 'PM', dataIndex: 'pm', key: 'pm' },
    { title: 'QA', dataIndex: 'qa', key: 'qa' },
    { title: 'Technical Lead', dataIndex: 'technicalLead', key: 'technicalLead' },
    { title: 'BA', dataIndex: 'ba', key: 'ba' },
    { title: 'Developers', dataIndex: 'developers', key: 'developers' },
    { title: 'Testers', dataIndex: 'testers', key: 'testers' },
    { title: 'Technical Consultancy', dataIndex: 'technicalConsultancy', key: 'technicalConsultancy' },
    { title: 'Actions', key: 'actions', render: (text, record) => (
      <span>
        <Button className='buttonEdit' type="link" onClick={() => showModal('Edit Project')}>Edit</Button>
        <Popconfirm
          title="Are you sure you want to delete this project?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button className='buttonDelete' type="link">Delete</Button>
        </Popconfirm>
      </span>
    ) },
  ];

  const data = [
    { key: '1', projectName: 'Hệ thống CRM cho doanh nghiệp', projectCode: 'CRM2024', duration: '2023-01-01 đến 2023-12-31', pm: 'Gigi Hadid', qa: 'Kendall Jenner', technicalLead: 'Adriana Lima', ba: 'Miranda Kerr', developers: 'Tyra Banks', testers: 'Heidi Klum', technicalConsultancy: 'Naomi Campbell' },
    { key: '2', projectName: 'Ứng dụng quản lý tài chính cá nhân', projectCode: 'FINAPP', duration: '2023-02-01 đến 2023-11-30', pm: 'Bella Hadid', qa: 'Barbara Palvin', technicalLead: 'Emily Ratajkowski', ba: 'Rosie Huntington-Whiteley', developers: 'Liu Wen', testers: 'Karlie Kloss', technicalConsultancy: 'Cindy Crawford' },
    { key: '3', projectName: 'Nền tảng thương mại điện tử', projectCode: 'ECOMMERCE2024', duration: '2023-03-01 đến 2023-10-31', pm: 'Kate Moss', qa: 'Joan Smalls', technicalLead: 'Irina Shayk', ba: 'Gisele Bündchen', developers: 'Cara Delevingne', testers: 'Alessandra Ambrosio', technicalConsultancy: 'Claudia Schiffer' },
    { key: '4', projectName: 'Hệ thống đặt vé trực tuyến', projectCode: 'TICKETMASTER', duration: '2023-04-01 đến 2023-09-30', pm: 'Natalia Vodianova', qa: 'Doutzen Kroes', technicalLead: 'Lily Aldridge', ba: 'Josephine Skriver', developers: 'Elsa Hosk', testers: 'Jourdan Dunn', technicalConsultancy: 'Freja Beha Erichsen' },
    { key: '5', projectName: 'Ứng dụng giao hàng nhanh', projectCode: 'EXPRESSDELIVERY', duration: '2023-05-01 đến 2023-08-31', pm: 'Lily Cole', qa: 'Coco Rocha', technicalLead: 'Behati Prinsloo', ba: 'Stella Maxwell', developers: 'Candice Swanepoel', testers: 'Sasha Pivovarova', technicalConsultancy: 'Linda Evangelista' },
    { key: '6', projectName: 'Hệ thống quản lý học tập', projectCode: 'LMS2024', duration: '2023-06-01 đến 2023-12-31', pm: 'Jourdan Dunn', qa: 'Suki Waterhouse', technicalLead: 'Barbara Palvin', ba: 'Elsa Hosk', developers: 'Romee Strijd', testers: 'Lais Ribeiro', technicalConsultancy: 'Karolina Kurkova' },
    { key: '7', projectName: 'Ứng dụng quản lý công việc', projectCode: 'TASKMANAGER', duration: '2023-07-01 đến 2023-10-31', pm: 'Joan Smalls', qa: 'Rosie Huntington-Whiteley', technicalLead: 'Cindy Crawford', ba: 'Liu Wen', developers: 'Martha Hunt', testers: 'Jasmine Tookes', technicalConsultancy: 'Shalom Harlow' },
    { key: '8', projectName: 'Hệ thống chăm sóc khách hàng', projectCode: 'CUSTOMERSUPPORT', duration: '2023-08-01 đến 2023-12-15', pm: 'Miranda Kerr', qa: 'Tyra Banks', technicalLead: 'Alessandra Ambrosio', ba: 'Kate Moss', developers: 'Lais Ribeiro', testers: 'Karlie Kloss', technicalConsultancy: 'Elle Macpherson' },
    { key: '9', projectName: 'Ứng dụng đặt đồ ăn', projectCode: 'FOODORDERING', duration: '2023-09-01 đến 2023-12-31', pm: 'Emily Ratajkowski', qa: 'Barbara Palvin', technicalLead: 'Cara Delevingne', ba: 'Doutzen Kroes', developers: 'Gigi Hadid', testers: 'Bella Hadid', technicalConsultancy: 'Natalia Vodianova' },
    { key: '10', projectName: 'Hệ thống thanh toán trực tuyến', projectCode: 'ONLINEPAYMENT', duration: '2023-10-01 đến 2024-04-30', pm: 'Adriana Lima', qa: 'Karlie Kloss', technicalLead: 'Naomi Campbell', ba: 'Gisele Bündchen', developers: 'Heidi Klum', testers: 'Candice Swanepoel', technicalConsultancy: 'Claudia Schiffer' },
    { key: '11', projectName: 'Nền tảng học trực tuyến', projectCode: 'E-LEARNING', duration: '2023-11-01 đến 2024-05-31', pm: 'Lily Aldridge', qa: 'Freja Beha Erichsen', technicalLead: 'Coco Rocha', ba: 'Elsa Hosk', developers: 'Romee Strijd', testers: 'Tyra Banks', technicalConsultancy: 'Linda Evangelista' },
    { key: '12', projectName: 'Ứng dụng quản lý nhân sự', projectCode: 'HRMS', duration: '2023-12-01 đến 2024-06-30', pm: 'Suki Waterhouse', qa: 'Josephine Skriver', technicalLead: 'Stella Maxwell', ba: 'Lais Ribeiro', developers: 'Miranda Kerr', testers: 'Gigi Hadid', technicalConsultancy: 'Heidi Klum' },
    { key: '13', projectName: 'Hệ thống phân tích dữ liệu', projectCode: 'DATAPLATFORM', duration: '2024-01-01 đến 2024-07-31', pm: 'Naomi Campbell', qa: 'Doutzen Kroes', technicalLead: 'Joan Smalls', ba: 'Barbara Palvin', developers: 'Candice Swanepoel', testers: 'Alessandra Ambrosio', technicalConsultancy: 'Cindy Crawford' },
    { key: '14', projectName: 'Ứng dụng du lịch', projectCode: 'TRAVELAPP', duration: '2024-02-01 đến 2024-08-31', pm: 'Gisele Bündchen', qa: 'Tyra Banks', technicalLead: 'Karlie Kloss', ba: 'Kate Moss', developers: 'Liu Wen', testers: 'Cara Delevingne', technicalConsultancy: 'Claudia Schiffer' },
    { key: '15', projectName: 'Nền tảng kết nối freelancer', projectCode: 'FREELANCERHUB', duration: '2024-03-01 đến 2024-09-30', pm: 'Heidi Klum', qa: 'Emily Ratajkowski', technicalLead: 'Adriana Lima', ba: 'Bella Hadid', developers: 'Miranda Kerr', testers: 'Barbara Palvin', technicalConsultancy: 'Linda Evangelista' },
    { key: '16', projectName: 'Hệ thống quản lý bệnh viện', projectCode: 'HMS', duration: '2024-04-01 đến 2024-10-31', pm: 'Candice Swanepoel', qa: 'Coco Rocha', technicalLead: 'Gigi Hadid', ba: 'Elsa Hosk', developers: 'Suki Waterhouse', testers: 'Jourdan Dunn', technicalConsultancy: 'Freja Beha Erichsen' }
];

  return (
    <div className="project-management-container">
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('Create New Project')} style={{ marginBottom: 16 }}>
        Create New Project
      </Button>
      <Table columns={columns} dataSource={data} className="project-management-table" />
      <Modal
        title={modalTitle}
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="project-management-form"
        >
          <Form.Item
            label="Project Name"
            name="projectName"
            rules={[{ required: true, message: 'Please input the project name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Project Code"
            name="projectCode"
            rules={[{ max: 20, message: 'Max length is 20 characters!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: 'Please select the duration!' }]}
          >
            <RangePicker />
          </Form.Item>

          <Form.Item
            label="PM"
            name="pm"
            rules={[{ required: true, message: 'Please select a PM!' }]}
          >
            <Select>
              <Option value="user1">User 1</Option>
              <Option value="user2">User 2</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="QA"
            name="qa"
            rules={[{ required: true, message: 'Please select a QA!' }]}
          >
            <Select>
              <Option value="user1">User 1</Option>
              <Option value="user2">User 2</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Technical Lead"
            name="technicalLead"
            rules={[{ required: true, message: 'Please select a Technical Lead!' }]}
          >
            <Select mode="multiple">
              <Option value="user1">User 1</Option>
              <Option value="user2">User 2</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="BA"
            name="ba"
            rules={[{ required: true, message: 'Please select a BA!' }]}
          >
            <Select mode="multiple">
              <Option value="user1">User 1</Option>
              <Option value="user2">User 2</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Developers"
            name="developers"
            rules={[{ required: true, message: 'Please select Developers!' }]}
          >
            <Select mode="multiple">
              <Option value="user1">User 1</Option>
              <Option value="user2">User 2</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Testers"
            name="testers"
            rules={[{ required: true, message: 'Please select Testers!' }]}
          >
            <Select mode="multiple">
              <Option value="user1">User 1</Option>
              <Option value="user2">User 2</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Technical Consultancy"
            name="technicalConsultancy"
            rules={[{ required: true, message: 'Please select Technical Consultancy!' }]}
          >
            <Select mode="multiple">
              <Option value="user1">User 1</Option>
              <Option value="user2">User 2</Option>
            </Select>
          </Form.Item>

          <div className="project-management-buttons">
            <Button type="primary" htmlType="submit" onClick={showSaveConfirm}>
              Save
            </Button>
            <Button type="default" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectManagement;