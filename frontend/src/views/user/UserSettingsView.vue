<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import useUser from '@/composables/useUser';

  const message = ref<{success: boolean, message: string}|null>(null);

  const { user, updateUser } = useUser();

  const firstName = ref(user.value?.firstName);
  const surname = ref(user.value?.surname);
  const phoneNumber = ref(user.value?.phoneNumber);
  const dateOfBirth = ref(user.value?.dateOfBirth);
  const gender = ref(user.value?.gender);

  async function handleUpdateUser() {
    try {
      if (firstName.value && surname.value && phoneNumber.value && dateOfBirth.value && gender.value) {
        const result = await updateUser(firstName.value, surname.value, phoneNumber.value, dateOfBirth.value, gender.value);
        if (result.success) message.value = result;
      } else {
        throw new Error('Uzupełnij dane w formularzu');
      }
    } catch (error) {
      if (error instanceof Error) {
        message.value = {success: false, message: error.message};
      }
    }
  }

  function handleCancel() {
    // Set form inputs back to current user values
    firstName.value = user.value?.firstName;
    surname.value = user.value?.surname;
    phoneNumber.value = user.value?.phoneNumber;
    dateOfBirth.value = user.value?.dateOfBirth;
    gender.value = user.value?.gender;
  }
</script>

<template>
  <section>
    <div v-if="message" class="text-center mx-8 p-2 border rounded-lg" :class="[message.success ? 'text-lime-500' : 'text-red-400']">
      {{ message.message }}
    </div>
    <div class="max-w-md mx-auto my-10 p-6">
      <div class="flex justify-between text-neutral-500 dark:text-neutral-300">
          <h3 class="font-medium">{{ user?.username }}</h3>
          <h3 class="font-medium">{{ user?.email }}</h3>
      </div>
      <hr class="border-neutral-500 dark:border-neutral-300 my-5">
      <form @submit.prevent="handleUpdateUser">
        <div class="my-5">
          <label for="avatar" class="text-neutral-500">TO DO: avatar image input</label>
          <input type="file" id="avatar" name="avatar" accept="image/*" disabled class="text-neutral-500"/>
        </div>
        <div class="my-5">
          <label for="firstname">Imię</label>
          <input type="text" id="firstname" v-model="firstName" required class="input mt-2" placeholder="Podaj imię">
        </div>
        <div class="my-5">
          <label for="surname">Nazwisko</label>
          <input type="text" id="surname" v-model="surname" required class="input mt-2" placeholder="Podaj nazwisko">
        </div>
        <div class="my-5">
          <label for="phonenumber">Numer telefonu</label>
          <input type="tel" id="phonenumber" v-model="phoneNumber" required pattern="[0-9]{9,15}" class="input mt-2">
        </div>
        <div class="my-5">
          <label for="date-of-birth">Data urodzenia</label>
          <input type="date" id="date-of-birth" v-model="dateOfBirth" required class="input mt-2">
        </div>
        <div class="my-5">
          <label for="gender">Płeć</label>
          <fieldset id="gender" class="xs:p-2 mt-2 flex justify-between">
            <div>
              <input type="radio" value="Mężczyzna" id="man" required v-model="gender">
              <label for="man" class="ml-4">Mężczyzna</label>
            </div>
            <div>
              <input type="radio" value="Kobieta" id="woman" required v-model="gender">
              <label for="woman" required class="ml-4">Kobieta</label>
            </div>
            <div>
              <input type="radio" value="Inna" id="other" required v-model="gender">
              <label for="other" required class="ml-4">Inna</label>
            </div>
          </fieldset>
        </div>
        <div class="flex justify-between mt-8">
          <RouterLink :to="{name: 'user-main'}" @click="handleCancel" class="px-4 py-1 border rounded-full">
            Anuluj
          </RouterLink>
          <button type="submit" class="btn-secondary">
            Zapisz zmiany
          </button>
        </div>
      </form>
    </div>
  </section>
</template>