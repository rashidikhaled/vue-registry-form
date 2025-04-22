<template>
  <q-card>
    <q-card-section>
      <div class="text-h5 text-center q-mb-md">Registered Users</div>
      <q-table
        flat
        bordered
        :rows="users"
        :columns="columns"
        row-key="email"
        :pagination="pagination">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              color="negative"
              icon="delete"
              @click="$emit('delete-user', props.row.email)" />
            <q-btn
              dense
              round
              flat
              color="primary"
              icon="edit"
              @click="$emit('edit-user', props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      columns: [
        {
          name: "firstName",
          required: true,
          label: "First Name",
          align: "left",
          field: (row) => row.firstName,
          sortable: true,
        },
        {
          name: "lastName",
          label: "Last Name",
          align: "left",
          field: (row) => row.lastName,
          sortable: true,
        },
        {
          name: "email",
          label: "Email",
          align: "left",
          field: (row) => row.email,
          sortable: true,
        },
        {
          name: "gender",
          label: "Gender",
          align: "left",
          field: (row) => row.gender,
        },
        {
          name: "country",
          label: "Country",
          align: "left",
          field: (row) => row.address.country,
        },
        {
          name: "actions",
          label: "Actions",
          align: "center",
          field: "",
        },
      ],
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
};
</script>

<style scoped>
.q-card {
  max-width: 800px;
  width: 100%;
}
</style>
