export const generateTransactionId = () => {
  return (
    "TXN" + "_" + Date.now().toString(36) + Math.random().toString(36).substr(2)
  );
};
