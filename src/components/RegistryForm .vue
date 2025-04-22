<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h5 text-center">Registration Form</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input
                filled
                v-model="formData.firstName"
                label="First Name *"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']" />

              <q-input
                filled
                v-model="formData.lastName"
                label="Last Name *"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']" />

              <q-input
                filled
                v-model="formData.email"
                label="Email *"
                type="email"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Field is required',
                  (val) => /.+@.+\..+/.test(val) || 'Email must be valid',
                ]" />

              <q-input
                filled
                v-model="formData.phone"
                label="Phone Number"
                mask="(###) ### - ####"
                unmasked-value />

              <q-select
                filled
                v-model="formData.gender"
                :options="genderOptions"
                label="Gender" />

              <q-input
                filled
                type="date"
                v-model="formData.birthDate"
                label="Birth Date" />

              <q-separator class="q-my-md" />

              <q-input
                filled
                v-model="formData.address.street"
                label="Street Address" />

              <q-input filled v-model="formData.address.city" label="City" />

              <q-input
                filled
                v-model="formData.address.state"
                label="State/Province" />

              <q-input
                filled
                v-model="formData.address.zipCode"
                label="Zip/Postal Code" />

              <q-select
                filled
                v-model="formData.address.country"
                :options="countryOptions"
                label="Country" />

              <q-separator class="q-my-md" />

              <q-input
                filled
                v-model="formData.username"
                label="Username *"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']" />

              <q-input
                filled
                type="password"
                v-model="formData.password"
                label="Password *"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Field is required',
                  (val) =>
                    val.length >= 8 || 'Password must be at least 8 characters',
                ]" />

              <q-input
                filled
                type="password"
                v-model="formData.confirmPassword"
                label="Confirm Password *"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Field is required',
                  (val) =>
                    val === formData.password || 'Passwords do not match',
                ]" />

              <q-separator class="q-my-md" />

              <q-checkbox
                v-model="formData.acceptTerms"
                label="I accept the terms and conditions *"
                :rules="[(val) => !!val || 'You must accept the terms']" />

              <div class="row justify-between q-mt-lg">
                <q-btn label="Reset" type="reset" color="negative" flat />
                <q-btn label="Submit" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="successDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Registration Successful!</div>
        </q-card-section>

        <q-card-section>
          Thank you for registering, {{ formData.firstName }}!
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: null,
        birthDate: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: null,
        },
        username: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      },
      genderOptions: ["Male", "Female", "Other", "Prefer not to say"],
      countryOptions: [
        "United States",
        "Canada",
        "Mexico",
        "United Kingdom",
        "Germany",
        "France",
        "Other",
      ],
      successDialog: false,
    };
  },
  methods: {
    onSubmit() {
      console.log("Form submitted:", this.formData);

      this.successDialog = true;

      this.onReset();
    },
    onReset() {
      this.formData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: null,
        birthDate: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: null,
        },
        username: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      };
    },
  },
};
</script>

<style scoped>
.q-card {
  max-width: 800px;
  width: 100%;
}
</style>
