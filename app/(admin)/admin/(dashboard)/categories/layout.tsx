import React from "react";

function CategoriesLayout({
  children,
  addCategoryModal,
}: {
  children: React.ReactNode;
  addCategoryModal: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {addCategoryModal}
    </div>
  );
}

export default CategoriesLayout;
