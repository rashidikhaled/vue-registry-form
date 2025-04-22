<template>
  <q-layout>
    <q-header class="bg-gradient-primary">
      <q-tabs
        v-model="tab"
        inline-label
        outside-arrows
        mobile-arrows
        dense
        class="text-white shadow-2"
        active-color="yellow-4"
        indicator-color="yellow-4">
        <q-tab
          name="registration"
          icon="how_to_reg"
          label="Registration"
          class="q-mx-sm" />
        <q-tab
          name="registrations"
          icon="group"
          label="Users"
          class="q-mx-sm" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-lg">
        <div class="row justify-center">
          <div class="col-12 col-md-10 col-lg-8">
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              transition-prev="jump-up"
              transition-next="jump-up"
              class="rounded-borders glass-effect">
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
      </q-page>
    </q-page-container>

    <q-dialog
      v-model="successDialog"
      transition-show="scale"
      transition-hide="scale">
      <q-card class="bg-positive text-white" style="width: 300px">
        <q-card-section class="row items-center">
          <q-avatar icon="check" color="white" text-color="positive" />
          <span class="q-ml-sm text-h6">Success!</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          User registered successfully!
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="View Users"
            color="white"
            @click="
              tab = 'registrations';
              successDialog = false;
            " />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="editDialog">
      <q-card style="width: 400px; border-radius: 12px">
        <q-card-section class="row items-center bg-primary text-white">
          <q-icon name="edit" size="sm" />
          <div class="text-h6 q-ml-sm">Edit User</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-input
            filled
            v-model="editUserData.firstName"
            label="First Name"
            class="q-mb-sm" />
          <q-input
            filled
            v-model="editUserData.lastName"
            label="Last Name"
            class="q-mb-sm" />
          <q-input
            filled
            v-model="editUserData.email"
            label="Email"
            type="email" />
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn
            flat
            label="Cancel"
            color="grey"
            v-close-popup
            class="q-mr-sm" />
          <q-btn
            label="Save Changes"
            color="primary"
            @click="saveEditedUser"
            v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="comingSoonDialog" position="bottom">
      <q-card style="width: 350px">
        <q-card-section class="row items-center">
          <q-icon name="schedule" color="primary" size="md" class="q-mr-sm" />
          <div class="text-subtitle1">This feature is coming soon!</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import RegistryForm from "../components/RegistryForm.vue";
import RegisteredUsersTable from "../components/RegisteredUsersTable.vue";

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
      comingSoonDialog: false,
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
          title: "Confirm Deletion",
          message: "Are you sure you want to delete this user?",
          cancel: true,
          persistent: true,
          ok: {
            color: "negative",
            label: "Delete",
            flat: true,
          },
          cancel: {
            color: "grey",
            label: "Cancel",
            flat: true,
          },
        })
        .onOk(() => {
          this.registeredUsers = this.registeredUsers.filter(
            (user) => user.email !== email
          );
          this.$q.notify({
            type: "positive",
            message: "User deleted successfully",
            position: "top-right",
            icon: "check_circle",
            progress: true,
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
          position: "top-right",
          icon: "check_circle",
          progress: true,
        });
      }
    },
    showComingSoon() {
      this.comingSoonDialog = true;
      setTimeout(() => {
        this.comingSoonDialog = false;
      }, 2000);
    },
  },
};
</script>
