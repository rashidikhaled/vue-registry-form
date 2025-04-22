<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> User Registration System </q-toolbar-title>
      </q-toolbar>

      <q-tabs v-model="tab" align="left">
        <q-tab
          name="registration"
          icon="how_to_reg"
          label="Registration Form" />
        <q-tab name="registrations" icon="list_alt" label="Registered Users" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <div class="row justify-center">
          <div class="col-12 col-md-8">
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="registration">
                <registry-form @submit="handleRegistration" />
              </q-tab-panel>

              <q-tab-panel name="registrations">
                <registered-users-table
                  :users="registeredUsers"
                  @delete-user="deleteUser"
                  @edit-user="editUser" />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>

        <q-dialog v-model="successDialog">
          <q-card>
            <q-card-section>
              <div class="text-h6">Registration Successful!</div>
            </q-card-section>

            <q-card-section> Thank you for registering! </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                label="OK"
                color="primary"
                v-close-popup
                @click="tab = 'registrations'" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="editDialog">
          <q-card style="min-width: 400px">
            <q-card-section>
              <div class="text-h6">Edit User</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                filled
                v-model="editUserData.firstName"
                label="First Name" />
              <q-input
                filled
                v-model="editUserData.lastName"
                label="Last Name"
                class="q-mt-sm" />
              <q-input
                filled
                v-model="editUserData.email"
                label="Email"
                class="q-mt-sm" />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn
                flat
                label="Save"
                color="primary"
                @click="saveEditedUser"
                v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import RegisteredUsersTable from "../components/RegisteredUsersTable.vue";
import RegistryForm from "../components/RegistryForm.vue";

export default {
  components: {
    RegistryForm,
    RegisteredUsersTable,
  },
  data() {
    return {
      tab: "registration",
      registeredUsers: [],
      successDialog: false,
      editDialog: false,
      editUserData: {
        firstName: "",
        lastName: "",
        email: "",
      },
    };
  },
  methods: {
    handleRegistration(userData) {
      this.registeredUsers.push(JSON.parse(JSON.stringify(userData)));
      this.successDialog = true;
    },
    deleteUser(email) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure you want to delete this user?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.registeredUsers = this.registeredUsers.filter(
            (user) => user.email !== email
          );
          this.$q.notify({
            type: "positive",
            message: "User deleted successfully",
          });
        });
    },
    editUser(user) {
      this.editUserData = JSON.parse(JSON.stringify(user));
      this.editDialog = true;
    },
    saveEditedUser() {
      const index = this.registeredUsers.findIndex(
        (user) => user.email === this.editUserData.email
      );
      if (index !== -1) {
        this.registeredUsers[index] = JSON.parse(
          JSON.stringify(this.editUserData)
        );
        this.$q.notify({
          type: "positive",
          message: "User updated successfully",
        });
      }
    },
  },
};
</script>
