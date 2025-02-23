import React, { useState, useEffect, useRef } from "react";
import { Table, Tag, Button, Dropdown, Modal } from "antd";
import { Eye, Printer, DollarSign, MoreHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { DUMMY_CLAIMS } from "@/constants/finance";
import { STATUS_COLORS } from "@/constants/common";
import { useReactToPrint } from "react-to-print";

const FinancePage = () => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const [dataSource, setDataSource] = useState(DUMMY_CLAIMS);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingClaim, setViewingClaim] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [printingClaim, setPrintingClaim] = useState(null);
  const printComponentRef = useRef();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    if (statusParam) {
      setDataSource(
        DUMMY_CLAIMS.filter(
          (item) => item.status.toLowerCase() === statusParam.toLowerCase(),
        ),
      );
    } else {
      setDataSource(DUMMY_CLAIMS);
    }
  }, [statusParam]);

  const handlePaid = (record) => {
    setSelectedClaim(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (selectedClaim) {
      setDataSource((prev) =>
        prev.map((item) =>
          item.id === selectedClaim.id ? { ...item, status: "Paid" } : item,
        ),
      );
    }
    setIsModalOpen(false);
    setSelectedClaim(null);
  };

  const handleView = (record) => {
    setViewingClaim(record);
    setIsViewModalOpen(true);
  };

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    onAfterPrint: () => {
      setIsPrintModalOpen(false);
      setPrintingClaim(null);
    },
    removeAfterPrint: true,
  });

  const handlePrintClick = (record) => {
    setPrintingClaim(record);
    setIsPrintModalOpen(true);
  };

  const getActionItems = (record) => {
    const baseActions = [
      {
        key: "view",
        label: "View",
        icon: <Eye className="h-4 w-4" />,
        onClick: () => handleView(record),
      },
      {
        key: "print",
        label: "Print",
        icon: <Printer className="h-4 w-4" />,
        onClick: () => handlePrintClick(record),
      },
    ];

    if (record.status === "Paid") {
      return baseActions;
    }

    return [
      ...baseActions,
      {
        type: "divider",
      },
      {
        key: "paid",
        label: "Paid",
        icon: <DollarSign className="h-4 w-4" />,
        onClick: () => handlePaid(record),
      },
    ];
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      render: (_text, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      ...(!statusParam && {
        filters: [
          { text: "Approved", value: "Approved" },
          { text: "Paid", value: "Paid" },
        ],
        onFilter: (value, record) => record.status === value,
      }),
      render: (status) => (
        <Tag color={STATUS_COLORS[status] || STATUS_COLORS.default}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Staff Name",
      dataIndex: "staffName",
      sorter: (a, b) => a.staffName.localeCompare(b.staffName),
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      sorter: (a, b) => a.projectName.localeCompare(b.projectName),
    },
    {
      title: "Project Duration",
      render: (_, record) => {
        const startDate = new Date(record.startDate);
        const endDate = new Date(record.endDate);
        return `From ${startDate.toDateString()} to ${endDate.toDateString()}`;
      },
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
      width: 350,
    },
    {
      title: "Total Working",
      dataIndex: "totalWorking",
      sorter: (a, b) => a.totalWorking - b.totalWorking,
      render: (number) => `${number} hours`,
      width: 150,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Dropdown
          menu={{ items: getActionItems(record), style: { width: "160px" } }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<MoreHorizontal className="h-4 w-4" />}
            className="flex items-center justify-center"
          />
        </Dropdown>
      ),
    },
  ];

  // Create a separate PrintableContent component
  const PrintableContent = React.forwardRef((props, ref) => (
    <div ref={ref} className="p-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Claim Receipt</h1>
        <p className="text-muted-foreground">
          Generated on: {new Date().toLocaleDateString()}
        </p>
      </div>

      {printingClaim && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="mb-2 font-semibold">Claim Information</h3>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="text-muted-foreground py-1">Claim ID:</td>
                    <td className="font-medium">{printingClaim.id}</td>
                  </tr>
                  <tr>
                    <td className="text-muted-foreground py-1">Status:</td>
                    <td>
                      <Tag color={STATUS_COLORS[printingClaim.status]}>
                        {printingClaim.status}
                      </Tag>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-muted-foreground py-1">Total Hours:</td>
                    <td className="font-medium">
                      {printingClaim.totalWorking} hours
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Staff Information</h3>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="text-muted-foreground py-1">Name:</td>
                    <td className="font-medium">{printingClaim.staffName}</td>
                  </tr>
                  <tr>
                    <td className="text-muted-foreground py-1">Project:</td>
                    <td className="font-medium">{printingClaim.projectName}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Project Duration</h3>
            <p>
              From{" "}
              <span className="font-medium">
                {new Date(printingClaim.startDate).toDateString()}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {new Date(printingClaim.endDate).toDateString()}
              </span>
            </p>
          </div>

          <div className="mt-6 border-t pt-6">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Signature</p>
              <div className="h-8 w-48 border-b border-dashed"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  ));

  return (
    <div className="flex flex-col gap-4 p-6">
      <Table
        size="small"
        columns={columns}
        dataSource={dataSource}
        pagination={{
          size: "default",
          pageSize: 10,
        }}
        onChange={(pagination) => setPagination(pagination)}
      />

      <Modal
        title="Confirm Payment"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to mark claim #{selectedClaim?.id} as paid?</p>
      </Modal>

      <Modal
        title={<h2 className="text-xl font-semibold">Claim Details</h2>}
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        width={700}
      >
        {viewingClaim && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Claim ID</p>
                <p className="font-medium">{viewingClaim.id}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Staff Name</p>
                <p className="font-medium">{viewingClaim.staffName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Project Name</p>
                <p className="font-medium">{viewingClaim.projectName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <Tag color={STATUS_COLORS[viewingClaim.status]}>
                  {viewingClaim.status}
                </Tag>
              </div>
              <div>
                <p className="text-muted-foreground">Project Duration</p>
                <p className="font-medium">
                  From {new Date(viewingClaim.startDate).toDateString()} to{" "}
                  {new Date(viewingClaim.endDate).toDateString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Working Hours</p>
                <p className="font-medium">{viewingClaim.totalWorking} hours</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="Print Preview"
        open={isPrintModalOpen}
        onCancel={() => {
          setIsPrintModalOpen(false);
          setPrintingClaim(null);
        }}
        footer={[
          <Button key="cancel" onClick={() => setIsPrintModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="print" type="primary" onClick={handlePrint}>
            Print
          </Button>,
        ]}
        width={800}
      >
        <PrintableContent ref={printComponentRef} />
      </Modal>

      {/* Hidden printable content */}
      <div style={{ display: "none" }}>
        <PrintableContent ref={printComponentRef} />
      </div>
    </div>
  );
};

export default FinancePage;
