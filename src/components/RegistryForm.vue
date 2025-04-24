<template>
  <q-card class="registry-form-card q-pa-lg">
    <q-card-section>
      <div class="text-h4 text-primary text-center q-mb-lg">
        Registration Form
      </div>
      <div class="text-subtitle2 text-grey text-center q-mb-lg">
        Complete the form below to register your account
      </div>
    </q-card-section>

    <q-card-section>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <div class="form-progress q-mb-lg">
          <q-stepper
            v-model="step"
            ref="stepper"
            color="primary"
            alternative-labels
            flat
            contracted>
            <q-step name="personal" title="Personal">
              <q-icon name="person" color="primary" />
            </q-step>
            <q-step name="address" title="Address">
              <q-icon name="home" color="primary" />
            </q-step>
            <q-step name="account" title="Account">
              <q-icon name="lock" color="primary" />
            </q-step>
          </q-stepper>
        </div>

        <!-- Personal Information Step -->
        <div v-show="step === 'personal'" class="step-content">
          <div class="section-header q-mb-md">
            <div class="text-h6 text-weight-bold">
              <q-icon name="person" color="primary" /> Personal Information
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                filled
                v-model="formData.firstName"
                label="First Name *"
                class="input-field"
                lazy-rules
                :rules="[required]">
                <template v-slot:prepend>
                  <q-icon name="badge" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                v-model="formData.lastName"
                label="Last Name *"
                class="input-field"
                lazy-rules
                :rules="[required]">
                <template v-slot:prepend>
                  <q-icon name="badge" />
                </template>
              </q-input>
            </div>
            <div class="col-12">
              <q-input
                filled
                v-model="formData.email"
                label="Email Address *"
                type="email"
                class="input-field"
                lazy-rules
                :rules="[required, emailRule]">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                v-model="formData.phone"
                label="Phone Number"
                mask="(###) ### - ####"
                class="input-field"
                unmasked-value>
                <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-select
                filled
                v-model="formData.gender"
                :options="genderOptions"
                label="Gender"
                class="input-field">
                <template v-slot:prepend>
                  <q-icon name="people" />
                </template>
              </q-select>
            </div>
            <div class="col-12">
              <q-input
                filled
                type="date"
                v-model="formData.birthDate"
                label="Birth Date"
                class="input-field">
                <template v-slot:prepend>
                  <q-icon name="event" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row justify-end q-mt-md">
            <q-btn
              label="Next"
              color="primary"
              @click="step = 'address'"
              icon-right="arrow_forward" />
          </div>
        </div>

        <!-- Address Information Step -->
        <div v-show="step === 'address'" class="step-content">
          <div class="section-header q-mb-md">
            <div class="text-h6 text-weight-bold">
              <q-icon name="home" color="primary" /> Address Information
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                filled
                v-model="formData.address.street"
                label="Street Address"
                class="input-field">
                <template v-slot:prepend>
                  <q-icon name="location_on" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                v-model="formData.address.city"
                label="City"
                class="input-field">
                <template v-slot:prepend>
                  <q-icon name="location_city" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                v-model="formData.address.state"
                label="State/Province"
                class="input-field">
                <template v-slot:prepend>
                  <q-icon name="map" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                v-model="formData.address.zipCode"
                label="Zip/Postal Code"
                class="input-field">
                <template v-slot:prepend>
                  <q-icon name="markunread_mailbox" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-select
                filled
                v-model="formData.address.country"
                :options="countryOptions"
                label="Country"
                class="input-field">
                <template v-slot:prepend>
                  <q-icon name="flag" />
                </template>
              </q-select>
            </div>
          </div>

          <div class="row justify-between q-mt-md">
            <q-btn
              flat
              label="Back"
              color="grey-7"
              @click="step = 'personal'"
              icon="arrow_back" />
            <q-btn
              label="Next"
              color="primary"
              @click="step = 'account'"
              icon-right="arrow_forward" />
          </div>
        </div>

        <!-- Account Information Step -->
        <div v-show="step === 'account'" class="step-content">
          <div class="section-header q-mb-md">
            <div class="text-h6 text-weight-bold">
              <q-icon name="lock" color="primary" /> Account Information
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                filled
                v-model="formData.username"
                label="Username *"
                class="input-field"
                lazy-rules
                :rules="[required]">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                :type="showPassword ? 'text' : 'password'"
                v-model="formData.password"
                label="Password *"
                class="input-field"
                lazy-rules
                :rules="[required, passwordRule]">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                :type="showPassword ? 'text' : 'password'"
                v-model="formData.confirmPassword"
                label="Confirm Password *"
                class="input-field"
                lazy-rules
                :rules="[required, confirmPasswordRule]">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="q-mt-md">
            <q-checkbox
              v-model="formData.acceptTerms"
              label="I accept the terms and conditions *"
              :rules="[(val) => val || 'You must accept the terms']" />
          </div>

          <div class="row justify-between q-mt-md">
            <q-btn
              flat
              label="Back"
              color="grey-7"
              @click="step = 'address'"
              icon="arrow_back" />
            <div>
              <q-btn
                outline
                label="Reset"
                type="reset"
                color="negative"
                class="q-mr-sm" />
              <q-btn
                label="Submit"
                type="submit"
                color="primary"
                :disable="!formData.acceptTerms"
                icon-right="send" />
            </div>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      step: "personal",
      showPassword: false,
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
        "Spain",
        "Italy",
        "Japan",
        "Australia",
        "Brazil",
        "India",
        "China",
        "Russia",
        "Other",
      ],
    };
  },
  methods: {
    required(val) {
      return !!val || "Field is required";
    },
    emailRule(val) {
      return /.+@.+\..+/.test(val) || "Email must be valid";
    },
    passwordRule(val) {
      return val.length >= 8 || "Password must be at least 8 characters";
    },
    confirmPasswordRule(val) {
      return val === this.formData.password || "Passwords do not match";
    },
    validateForm() {
      // Validate required fields based on current step
      let isValid = true;

      // Validate personal information
      if (
        !this.formData.firstName ||
        !this.formData.lastName ||
        !this.formData.email
      ) {
        isValid = false;
      }

      // Validate email format
      if (this.formData.email && !/.+@.+\..+/.test(this.formData.email)) {
        isValid = false;
      }

      // Validate account information
      if (!this.formData.username || !this.formData.password) {
        isValid = false;
      }

      // Validate password length
      if (this.formData.password && this.formData.password.length < 8) {
        isValid = false;
      }

      // Validate password match
      if (this.formData.password !== this.formData.confirmPassword) {
        isValid = false;
      }

      // Validate terms acceptance
      if (!this.formData.acceptTerms) {
        isValid = false;
      }

      return isValid;
    },
    onSubmit() {
      if (this.validateForm()) {
        // Create a clean version of the data (removing confirmPassword)
        const submissionData = { ...this.formData };
        delete submissionData.confirmPassword;

        this.$emit("submit", submissionData);
        this.onReset();
      }
    },
    onReset() {
      this.step = "personal";
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
.registry-form-card {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.section-header {
  border-left: 4px solid var(--q-primary);
  padding-left: 12px;
}

.input-field {
  border-radius: 8px;
}

.input-field :deep(.q-field__control) {
  height: 56px;
}

.step-content {
  animation: fadeIn 0.3s ease-in-out;
}

.form-progress {
  margin-bottom: 2rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
