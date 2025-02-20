export const HEADER_LINKS = [
  {
    role: "claimer",
    home: [
      {
        key: "1",
        label: "Home",
        to: "/",
      },
    ],
    dropdown: {
      to: "claim/view-claim",
      label: "My claim",
      menu: [
        {
          key: "1",
          label: "Draft",
          to: "claim/view-claim?status=draft",
        },
        {
          key: "2",
          label: "Pending Approval",
          to: "claim/view-claim?status=pending",
        },
        {
          key: "3",
          label: "Approved",
          to: "claim/view-claim?status=approved",
        },
        {
          key: "4",
          label: "Paid",
          to: "claim/view-claim?status=paid",
        },
        {
          key: "5",
          label: "Rejected",
          to: "claim/view-claim?status=rejected",
        },
        {
          key: "6",
          label: "Cancelled",
          to: "claim/view-claim?status=cancelled",
        },
      ],
    },
  },
  {
    role: "approver",
    home: [
      {
        key: "1",
        label: "Home",
        to: "#",
      },
    ],
    dropdown: {
      label: "Claim for approval",
      menu: [
        {
          key: "1",
          label: "For My Vetting",
          to: "#",
        },
        {
          key: "2",
          label: "Approved or Paid",
          to: "#",
        },
      ],
    },
  },
  {
    role: "finance",
    home: [
      {
        key: "1",
        label: "Home",
        to: "#",
      },
    ],
    dropdown: {
      to: "finance",
      label: "Claim for finance",
      menu: [
        {
          key: "1",
          label: "Approved",
          to: "finance?status=approved",
        },
        {
          key: "2",
          label: "Paid",
          to: "finance?status=paid",
        },
      ],
    },
  },
  {
    role: "administrator",
    home: [
      {
        key: "1",
        label: "Home",
        to: "#",
      },
    ],
    dropdown: {
      label: "Configuration",
      menu: [
        {
          key: "1",
          label: "Staff Information",
          to: "#",
        },
        {
          key: "2",
          label: "Project Information",
          to: "manage/project",
        },
      ],
    },
  },
];
