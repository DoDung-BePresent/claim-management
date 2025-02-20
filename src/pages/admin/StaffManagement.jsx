import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, Button, Table, Modal, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../index.css';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { confirm } = Modal;

const StaffManagement = () => {
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

  const handleDelete = (key) => {
    console.log('Deleted staff with key:', key);
    // Add your delete logic here
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
    });
  };

  const showModal = (title) => {
    setModalTitle(title);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const columns = [
    { title: 'Staff Name', dataIndex: 'staffName', key: 'staffName' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Job Rank', dataIndex: 'jobRank', key: 'jobRank' },
    { title: 'Salary', dataIndex: 'salary', key: 'salary' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Experience', dataIndex: 'experience', key: 'experience' },
    { title: 'Joining Date', dataIndex: 'joiningDate', key: 'joiningDate' },
    { title: 'Contact', dataIndex: 'contact', key: 'contact' },
    { title: 'Actions', key: 'actions', render: (text, record) => (
      <span>
        <Button className='buttonEdit' type="link" onClick={() => showModal('Edit Staff')}>Edit</Button>
        <Popconfirm
          title="Are you sure you want to delete this staff member?"
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
    { key: '1', staffName: 'John Doe', department: 'IT', jobRank: 'Senior Developer', salary: 80000, role: 'Backend Developer', experience: '5 years', joiningDate: '2018-06-15', contact: 'john.doe@example.com' },
    { key: '2', staffName: 'Jane Smith', department: 'HR', jobRank: 'HR Manager', salary: 70000, role: 'Recruitment Specialist', experience: '7 years', joiningDate: '2016-03-22', contact: 'jane.smith@example.com' },
    { key: '3', staffName: 'Michael Brown', department: 'Finance', jobRank: 'Accountant', salary: 65000, role: 'Financial Analyst', experience: '6 years', joiningDate: '2017-09-10', contact: 'michael.brown@example.com' },
    { key: '4', staffName: 'Emily Johnson', department: 'Marketing', jobRank: 'Marketing Lead', salary: 75000, role: 'Digital Marketing', experience: '8 years', joiningDate: '2015-11-30', contact: 'emily.johnson@example.com' },
    { key: '5', staffName: 'Robert Wilson', department: 'IT', jobRank: 'Technical Lead', salary: 90000, role: 'Frontend Developer', experience: '10 years', joiningDate: '2013-07-25', contact: 'robert.wilson@example.com' },
  ];

  return (
    <div className="project-management-container">
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('Create New Staff')} style={{ marginBottom: 16 }}>
        Create New Staff
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
            label="Staff Name"
            name="staffName"
            rules={[{ required: true, message: 'Please input the staff name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: 'Please select the department!' }]}
          >
            <Select>
              <Option value="IT">IT</Option>
              <Option value="HR">HR</Option>
              <Option value="Finance">Finance</Option>
              <Option value="Marketing">Marketing</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Job Rank"
            name="jobRank"
            rules={[{ required: true, message: 'Please input the job rank!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: 'Please input the salary!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please input the role!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Experience"
            name="experience"
            rules={[{ required: true, message: 'Please input the experience!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Joining Date"
            name="joiningDate"
            rules={[{ required: true, message: 'Please select the joining date!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Contact"
            name="contact"
            rules={[{ required: true, message: 'Please input the contact!' }]}
          >
            <Input />
          </Form.Item>

          <div className="project-management-buttons">
            <Button type="primary" onClick={showSaveConfirm}>
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

export default StaffManagement;