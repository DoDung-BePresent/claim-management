import React, { useEffect, useState } from "react";
import { Flex, Table, Tag } from "antd";
import _ from "lodash";

const getStatusBackGroundColor = (status) => {
  switch (status) {
    case "Draft":
      return "#6C757D";
    case "Pending":
      return "#FFC107";
    case "Approved":
      return "#007BFF";
    case "Rejected":
      return "#DC3545";
    default:
      return "#28A745";
  }
};

const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={getStatusBackGroundColor(status)}>{status}</Tag>
    ),
  },
  {
    title: "Staff Name",
    dataIndex: "staffName",
  },
  {
    title: "Claim Name",
    dataIndex: "claimName",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Total Working",
    dataIndex: "totalWorking",
  },
];

export default function ViewClaim() {
  return <TableClaim />;
}

function TableClaim() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const uniqueIds = _.shuffle(_.range(1, 10001)).slice(0, 1000);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const initialData = uniqueIds.map((id, i) => ({
    key: i,
    id,
    status: ["Draft", "Pending", "Approved", "Rejected"][getRandomInt(0, 3)],
    staffName: `Edward King ${getRandomInt(1, 50)}`,
    claimName: `Claim ${getRandomInt(1, 50)}`,
    date: `From ${new Date(
      getRandomInt(1700000000000, 1800000000000),
    ).toDateString()} 
           to ${new Date(
             getRandomInt(1800000000000, 1900000000000),
           ).toDateString()}`,
    totalWorking: getRandomInt(100, 500),
  }));

  const [newDataSource, setNewDataSource] = useState(initialData);
  const [sortedDataSource, setSortedDataSource] = useState(initialData);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  function handleDeleteRowClaim() {
    const updatedData = sortedDataSource.filter(
      (item) => !selectedRowKeys.includes(item.key),
    );
    setNewDataSource(updatedData);
    setSelectedRowKeys([]);
  }

  useEffect(() => {
    setSortedDataSource(newDataSource);
  }, [newDataSource]);

  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div className="bg-white-900 flex flex-col gap-4 p-6 text-gray-100">
      <ViewClaimActions
        sortedDataSource={sortedDataSource}
        setSortedDataSource={setSortedDataSource}
      />
      <Flex gap="middle" vertical>
        {hasSelected ? (
          <div className="grid h-18 grid-cols-3 items-center rounded-lg bg-purple-700 px-8">
            <Logo />
            <ButtonActions
              selectedRowKeys={selectedRowKeys}
              onDeleteRowClaim={handleDeleteRowClaim}
            />
            <NumberRowChossen selectedRowKeys={selectedRowKeys} />
          </div>
        ) : null}

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={sortedDataSource}
          pagination={{
            position: ["bottomCenter"],
          }}
        />
      </Flex>
    </div>
  );
}

function ViewClaimActions({ sortedDataSource, setSortedDataSource }) {
  const [sortBy, setSortBy] = useState("Id");

  useEffect(() => {
    let sorted = [...sortedDataSource];

    if (sortBy === "Id") sorted.sort((a, b) => a.id - b.id);
    if (sortBy === "Staff Name")
      sorted.sort((a, b) => a.staffName.localeCompare(b.staffName));
    if (sortBy === "Claim Name")
      sorted.sort((a, b) => a.claimName.localeCompare(b.claimName));
    if (sortBy === "Total Working")
      sorted.sort((a, b) => a.totalWorking - b.totalWorking);

    if (sortBy === "Date")
      sorted.sort((a, b) => {
        const dateA = new Date(
          a.date.split(" to ")[0].replace("From", ","),
        ).getTime();
        const dateB = new Date(
          b.date.split(" to ")[0].replace("From", ","),
        ).getTime();

        return dateA - dateB;
      });

    setSortedDataSource(sorted);
  }, [sortBy]);

  return (
    <div className="flex justify-end">
      <select
        className="cursor-pointer rounded-full bg-white px-4 py-2 font-bold text-black"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        {columns
          .filter((column) => column.title !== "Status")
          .map((column) => (
            <option key={column.title} value={column.title}>
              Sort by: {column.title}
            </option>
          ))}
      </select>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span role="img" className="text-3xl">
        🏢
      </span>
      <h1 className="text-2xl font-semibold text-white">Claim Management</h1>
    </div>
  );
}

function ButtonActions({ selectedRowKeys, onDeleteRowClaim }) {
  return (
    <div className="flex justify-center gap-4">
      {selectedRowKeys.length > 1 ? (
        <>
          <button className="rounded bg-purple-700 px-4 py-2 text-lg text-white">
            <strong>Submit</strong>
          </button>
          <button
            className="rounded bg-purple-700 px-4 py-2 text-lg text-white"
            onClick={onDeleteRowClaim}
          >
            <strong>Delete</strong>
          </button>
        </>
      ) : (
        <>
          <button className="rounded bg-purple-700 px-4 py-2 text-lg text-white">
            <strong>Update</strong>
          </button>
          <button className="rounded bg-purple-700 px-4 py-2 text-lg text-white">
            <strong>Submit</strong>
          </button>
          <button
            className="rounded bg-purple-700 px-4 py-2 text-lg text-white"
            onClick={onDeleteRowClaim}
          >
            <strong>Delete</strong>
          </button>
          <button className="rounded bg-purple-700 px-4 py-2 text-lg text-white">
            <strong>View</strong>
          </button>
        </>
      )}
    </div>
  );
}

function NumberRowChossen({ selectedRowKeys }) {
  return (
    <p className="justify-self-end text-lg">
      Selected <strong>{selectedRowKeys.length}</strong> items
    </p>
  );
}
