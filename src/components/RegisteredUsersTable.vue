<template>
  <q-card class="users-table-card" flat bordered>
    <q-card-section>
      <div class="text-h5 text-primary text-center q-mb-md">
        Registered Users
      </div>
      <q-table
        flat
        bordered
        :rows="users"
        :columns="columns"
        row-key="email"
        :pagination="pagination"
        :loading="loading"
        binary-state-sort
        color="primary"
        card-class="bg-white"
        :rows-per-page-options="[5, 10, 15, 20]"
        v-model:pagination="pagination"
        class="users-table">
        <template v-slot:top-right>
          <q-input dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-gender="props">
          <q-td :props="props">
            <q-chip
              :color="props.value === 'Male' ? 'blue-2' : 'pink-2'"
              :text-color="props.value === 'Male' ? 'blue-10' : 'pink-10'"
              dense
              outline
              size="sm">
              {{ props.value }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div class="row no-wrap justify-center q-gutter-sm">
              <q-btn
                flat
                round
                color="primary"
                icon="edit"
                size="sm"
                @click="$emit('edit-user', props.row)">
                <q-tooltip>Edit User</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="negative"
                icon="delete"
                size="sm"
                @click="confirmDelete(props.row)">
                <q-tooltip>Delete User</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>

        <template v-slot:no-data>
          <div class="full-width row flex-center text-grey q-gutter-sm q-pa-lg">
            <q-icon name="sentiment_dissatisfied" size="2em" />
            <span>No users registered yet</span>
          </div>
        </template>
      </q-table>
    </q-card-section>
  </q-card>

  <!-- Delete Confirmation Dialog -->
  <q-dialog v-model="deleteDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="negative" text-color="white" />
        <span class="q-ml-sm">Are you sure you want to delete this user?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Delete"
          color="negative"
          @click="deleteUser"
          v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filter: "",
      deleteDialog: false,
      userToDelete: null,
      pagination: {
        sortBy: "firstName",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
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
          align: "center",
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
        },
      ],
    };
  },
  methods: {
    confirmDelete(user) {
      this.userToDelete = user;
      this.deleteDialog = true;
    },
    deleteUser() {
      this.$emit("delete-user", this.userToDelete.email);
      this.userToDelete = null;
    },
  },
};
</script>

<style scoped>
.users-table-card {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.users-table .q-table__card {
  border-radius: 8px;
}

.users-table th {
  font-weight: 600;
  background-color: #f7fafc;
}

.users-table tbody tr:hover {
  background-color: #f5f9ff !important;
}
</style>
