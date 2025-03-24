import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Slider } from "primereact/slider";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { customerData } from "../mockData/tableData";

export default function TableResults() {
  const [dramas, setDramas] = useState(null); // Renamed from customers to dramas
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedDrama, setSelectedDrama] = useState(""); // Renamed from selectedCustomer to selectedDrama
  const [representatives] = useState([
    { name: "Amy Elsner", image: "amyelsner.png" },
    { name: "Anna Fali", image: "annafali.png" },
    { name: "Asiya Javayant", image: "asiyajavayant.png" },
    { name: "Bernardo Dominic", image: "bernardodominic.png" },
    { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    { name: "Ioni Bowcher", image: "ionibowcher.png" },
    { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    { name: "Onyama Limba", image: "onyamalimba.png" },
    { name: "Stephen Shaw", image: "stephenshaw.png" },
    { name: "XuXue Feng", image: "xuxuefeng.png" },
  ]);
  const [statuses] = useState([
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
  ]);

  const [showRadio, setShowRadio] = useState(true);

  const getSeverity = (status) => {
    switch (status) {
      case "unqualified":
        return "danger";

      case "qualified":
        return "success";

      case "new":
        return "info";

      case "negotiation":
        return "warning";

      case "renewal":
        return null;
    }
  };

  useEffect(() => {
    setDramas(customerData); // Renamed from setCustomers to setDramas
    initFilters();
  }, []);

  const formatDate = (value) => {
    return value?.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      "country.name": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      actor: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
   
      launchDate: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },

      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      
      
    });
    setGlobalFilterValue("");
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilter}
        />
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt="flag"
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`flag flag-${rowData.country.code}`}
          style={{ width: "24px" }}
        />
        <span>{rowData.country.name}</span>
      </div>
    );
  };

  const filterClearTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-times"
        onClick={options.filterClearCallback}
        severity="secondary"
      ></Button>
    );
  };

  const filterApplyTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-check"
        onClick={options.filterApplyCallback}
        severity="success"
      ></Button>
    );
  };

  const filterFooterTemplate = () => {
    return <div className="px-3 pt-0 pb-3 text-center">Filter by Country</div>;
  };




  const dateBodyTemplate = (rowData) => {
    return rowData.launchDate;
    //return formatDate(rowData.date);
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };




  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };









  const header = renderHeader();

  const dramaSelected = (value) => { // Renamed from customerSelected to dramaSelected
    console.log(value);
    setSelectedDrama(value); // Renamed from setSelectedCustomer to setSelectedDrama
  };

  return (
    <div className="card">
        
          <div className="col-12 md-8">
      <DataTable
        value={dramas} // Renamed from customers to dramas
        paginator
        showGridlines
        selectionMode={showRadio ? "single" : "null"}
        selection={selectedDrama} // Renamed from selectedCustomer to selectedDrama
        onSelectionChange={(e) => dramaSelected(e.value)} // Updated callback
        rows={10}
        loading={loading}
        dataKey="id"
        filters={filters}
        globalFilterFields={[
          "name",
          "country.name",
          "status",
        ]}
        header={header}
        emptyMessage="No dramas found."
        onFilter={(e) => setFilters(e.filters)}
      >
        {showRadio && <Column selectionMode="single" />}
        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Country"
          filterField="country.name"
          style={{ minWidth: "12rem" }}
          body={countryBodyTemplate}
          filter
          filterPlaceholder="Search by country"
          filterClear={filterClearTemplate}
          filterApply={filterApplyTemplate}
          filterFooter={filterFooterTemplate}
        />
  
        <Column
          header="Launch Date"
          filterField="launchDate"
          dataType="date"
          style={{ minWidth: "10rem" }}
          body={dateBodyTemplate}
          filter
          filterElement={dateFilterTemplate}
        />
          <Column
          field="actor"
          header="Actor"
          filter
          filterPlaceholder="Search by actor"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="status"
          header="Status"
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem" }}
          body={statusBodyTemplate}
          filter
          filterElement={statusFilterTemplate}
        />


      </DataTable>
      </div>
      </div>

  );
}
