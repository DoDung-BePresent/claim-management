export const CLAIM_STATUSES = {
  DRAFT: "Draft",
  PENDING: "Pending",
  APPROVED: "Approved",
  PAID: "Paid",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",
};

export const STATUS_COLORS = {
  [CLAIM_STATUSES.DRAFT]: "#6C757D", // Xám
  [CLAIM_STATUSES.PENDING]: "#FFC107", // Vàng
  [CLAIM_STATUSES.APPROVED]: "#007BFF", // Xanh dương
  [CLAIM_STATUSES.PAID]: "#28A745", // Xanh lá
  [CLAIM_STATUSES.REJECTED]: "#DC3545", // Đỏ
  [CLAIM_STATUSES.CANCELLED]: "#6F42C1", // Tím
  default: "#28A745",
};
