export default function () {
  return [
    {
      title: "Home",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Send Mail",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    },
    {
      title: "Employees",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/tables",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Employee Details",
      htmlBefore: '<i class="material-icons">edit</i>',
      to: "/employee-details",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    },
    {
      title: "Add New Employee",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/add-new-employee",
    }
  ];
}
