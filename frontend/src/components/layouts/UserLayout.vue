<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import useUser from '@/composables/useUser';
  import { useRouter } from "vue-router";

  const router = useRouter();

  const { user, logoutUser } = useUser();

  function handleLogout() {
    logoutUser();
    router.push({name: 'home'});
  }
</script>

<template>
    <div class="h-screen grid grid-cols-[20rem_minmax(20rem,_1fr)] grid-rows-[6rem_1fr] bg-layout-secondary gap-1">
      <header class="col-start-2 bg-layout-primary">
        <div class="flex justify-end items-center h-full">
          <div class="flex gap-2 items-center">
            <label for="dark-mode">Dark Mode</label>
            <input id="dark-mode" type="checkbox" class="w-24 h-12 appearance-none bg-neutral-100 rounded-full p-1 before:block before:bg-dominant-primary before:h-full before:w-10 before:rounded-full checked:before:ml-12 cursor-pointer">
          </div>
          <label class="p-5 bg-neutral-100 rounded-2xl flex gap-5 items-center ml-6">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7666 20.8574C16.7309 20.8574 20.7552 16.8331 20.7552 11.8688C20.7552 6.90458 16.7309 2.88026 11.7666 2.88026C6.80239 2.88026 2.77808 6.90458 2.77808 11.8688C2.77808 16.8331 6.80239 20.8574 11.7666 20.8574Z" stroke="#141414" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.0183 18.5874L21.5423 22.1022" stroke="#141414" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input type="text" placeholder="Search here" class="min-w-xs outline-none">
          </label>
          <div class="flex gap-4 items-center ml-16">
            <img src="/users/default_user.webp" alt="user avatar" class="h-15 rounded-full border border-dominant-primary">
            <h4>{{ user!.firstName + ' ' + user!.surname }}</h4>
          </div>
        </div>
      </header>
      <aside class="col-start-1 row-span-full flex flex-col justify-between bg-layout-primary">
        <RouterLink :to="{name: 'home'}" class="h-16 text-dominant-primary text-3xl my-4 mx-auto leading-[4rem]">
          CARENT
        </RouterLink>
        <nav>
          <ul class="flex flex-col">
            <li>
              <RouterLink :to="{name: 'user-main'}" class="flex gap-3 items-center p-8 ml-5 rounded-l-full bg-layout-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.25 18C11.25 18.4142 11.5858 18.75 12 18.75C12.4142 18.75 12.75 18.4142 12.75 18V15C12.75 14.5858 12.4142 14.25 12 14.25C11.5858 14.25 11.25 14.5858 11.25 15V18Z" fill="#FE8400"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C11.2919 1.25 10.6485 1.45282 9.95055 1.79224C9.27585 2.12035 8.49642 2.60409 7.52286 3.20832L5.45628 4.4909C4.53509 5.06261 3.79744 5.5204 3.2289 5.95581C2.64015 6.40669 2.18795 6.86589 1.86131 7.46263C1.53535 8.05812 1.38857 8.69174 1.31819 9.4407C1.24999 10.1665 1.24999 11.0541 1.25 12.1672V13.7799C1.24999 15.6837 1.24998 17.1866 1.4027 18.3616C1.55937 19.567 1.88856 20.5401 2.63236 21.3094C3.37958 22.0824 4.33046 22.4277 5.50761 22.5914C6.64849 22.75 8.10556 22.75 9.94185 22.75H14.0581C15.8944 22.75 17.3515 22.75 18.4924 22.5914C19.6695 22.4277 20.6204 22.0824 21.3676 21.3094C22.1114 20.5401 22.4406 19.567 22.5973 18.3616C22.75 17.1866 22.75 15.6838 22.75 13.7799V12.1672C22.75 11.0541 22.75 10.1665 22.6818 9.4407C22.6114 8.69174 22.4646 8.05812 22.1387 7.46263C21.8121 6.86589 21.3599 6.40669 20.7711 5.95581C20.2026 5.5204 19.4649 5.06262 18.5437 4.49091L16.4771 3.20831C15.5036 2.60409 14.7241 2.12034 14.0494 1.79224C13.3515 1.45282 12.7081 1.25 12 1.25ZM8.27953 4.50412C9.29529 3.87371 10.0095 3.43153 10.6065 3.1412C11.1882 2.85833 11.6002 2.75 12 2.75C12.3998 2.75 12.8118 2.85833 13.3935 3.14119C13.9905 3.43153 14.7047 3.87371 15.7205 4.50412L17.7205 5.74537C18.6813 6.34169 19.3559 6.76135 19.8591 7.1467C20.3487 7.52164 20.6303 7.83106 20.8229 8.18285C21.0162 8.53589 21.129 8.94865 21.1884 9.58104C21.2492 10.2286 21.25 11.0458 21.25 12.2039V13.725C21.25 15.6959 21.2485 17.1012 21.1098 18.1683C20.9736 19.2163 20.717 19.8244 20.2892 20.2669C19.8649 20.7058 19.2871 20.9664 18.2858 21.1057C17.2602 21.2483 15.9075 21.25 14 21.25H10C8.09247 21.25 6.73983 21.2483 5.71422 21.1057C4.71286 20.9664 4.13514 20.7058 3.71079 20.2669C3.28301 19.8244 3.02642 19.2163 2.89019 18.1683C2.75149 17.1012 2.75 15.6959 2.75 13.725V12.2039C2.75 11.0458 2.75076 10.2286 2.81161 9.58104C2.87103 8.94865 2.98385 8.53589 3.17709 8.18285C3.36965 7.83106 3.65133 7.52164 4.14092 7.1467C4.6441 6.76135 5.31869 6.34169 6.27953 5.74537L8.27953 4.50412Z" fill="#FE8400"/>
                </svg>
                <span>Główna</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'user-orders'}" class="flex gap-3 items-center p-8 ml-5 rounded-l-full bg-layout-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.09264 9.40426H20.9166" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.4421 13.3097H16.4513" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.0046 13.3097H12.0139" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.55789 13.3097H7.56716" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.4421 17.1962H16.4513" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.0046 17.1962H12.0139" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.55789 17.1962H7.56716" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.0437 2V5.29078" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.96551 2V5.29078" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2383 3.57919H7.77096C4.83427 3.57919 3 5.21513 3 8.22222V17.2719C3 20.3262 4.83427 22 7.77096 22H16.229C19.175 22 21 20.3546 21 17.3475V8.22222C21.0092 5.21513 19.1842 3.57919 16.2383 3.57919Z" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Moje zamówienia</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'user-analitics'}" class="flex gap-3 items-center p-8 ml-5 rounded-l-full bg-layout-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.24485 14.7815L10.238 10.8913L13.6522 13.5732L16.5812 9.79291" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9954 6.12244C21.057 6.12244 21.9176 5.26184 21.9176 4.20024C21.9176 3.13864 21.057 2.27805 19.9954 2.27805C18.9338 2.27805 18.0732 3.13864 18.0732 4.20024C18.0732 5.26184 18.9338 6.12244 19.9954 6.12244Z" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14.9245 3.12015H7.65675C4.64531 3.12015 2.77803 5.25287 2.77803 8.26431V16.3467C2.77803 19.3581 4.60869 21.4817 7.65675 21.4817H16.2609C19.2723 21.4817 21.1396 19.3581 21.1396 16.3467V9.30779" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Analityka</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'user-rent'}" class="flex gap-3 items-center p-8 ml-5 rounded-l-full bg-layout-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.9996 11.7501H3.9996C3.7696 11.7501 3.5596 11.6501 3.4196 11.4701C3.2796 11.3001 3.2196 11.0601 3.2696 10.8401L4.3996 5.44008C4.7696 3.69008 5.5196 2.08008 8.4896 2.08008H15.5196C18.4896 2.08008 19.2396 3.70008 19.6096 5.44008L20.7396 10.8501C20.7896 11.0701 20.7296 11.3001 20.5896 11.4801C20.4396 11.6501 20.2296 11.7501 19.9996 11.7501ZM4.9196 10.2501H19.0696L18.1296 5.75008C17.8496 4.44008 17.5196 3.58008 15.5096 3.58008H8.4896C6.4796 3.58008 6.1496 4.44008 5.8696 5.75008L4.9196 10.2501Z" fill="#FE8400"/>
                  <path d="M19.9596 22.7501H18.0796C16.4596 22.7501 16.1496 21.8201 15.9496 21.2101L15.7496 20.6101C15.4896 19.8501 15.4596 19.7501 14.5596 19.7501H9.4396C8.5396 19.7501 8.4796 19.9201 8.2496 20.6101L8.0496 21.2101C7.8396 21.8301 7.5396 22.7501 5.9196 22.7501H4.0396C3.2496 22.7501 2.4896 22.4201 1.9596 21.8401C1.4396 21.2701 1.1896 20.5101 1.2596 19.7501L1.8196 13.6601C1.9696 12.0101 2.4096 10.2501 5.6196 10.2501H18.3796C21.5896 10.2501 22.0196 12.0101 22.1796 13.6601L22.7396 19.7501C22.8096 20.5101 22.5596 21.2701 22.0396 21.8401C21.5096 22.4201 20.7496 22.7501 19.9596 22.7501ZM9.4396 18.2501H14.5596C16.3796 18.2501 16.8096 19.0601 17.1696 20.1201L17.3796 20.7401C17.5496 21.2501 17.5496 21.2601 18.0896 21.2601H19.9696C20.3396 21.2601 20.6896 21.1101 20.9396 20.8401C21.1796 20.5801 21.2896 20.2501 21.2596 19.9001L20.6996 13.8101C20.5696 12.4601 20.4096 11.7601 18.3996 11.7601H5.6196C3.5996 11.7601 3.4396 12.4601 3.3196 13.8101L2.7596 19.9001C2.7296 20.2501 2.8396 20.5801 3.0796 20.8401C3.3196 21.1101 3.6796 21.2601 4.0496 21.2601H5.9296C6.4696 21.2601 6.4696 21.2501 6.6396 20.7501L6.8396 20.1401C7.0896 19.3401 7.4596 18.2501 9.4396 18.2501Z" fill="#FE8400"/>
                  <path d="M3.9996 8.75009H2.9996C2.5896 8.75009 2.2496 8.41009 2.2496 8.00009C2.2496 7.59009 2.5896 7.25009 2.9996 7.25009H3.9996C4.4096 7.25009 4.7496 7.59009 4.7496 8.00009C4.7496 8.41009 4.4096 8.75009 3.9996 8.75009Z" fill="#FE8400"/>
                  <path d="M20.9996 8.75009H19.9996C19.5896 8.75009 19.2496 8.41009 19.2496 8.00009C19.2496 7.59009 19.5896 7.25009 19.9996 7.25009H20.9996C21.4096 7.25009 21.7496 7.59009 21.7496 8.00009C21.7496 8.41009 21.4096 8.75009 20.9996 8.75009Z" fill="#FE8400"/>
                  <path d="M11.9996 5.75009C11.5896 5.75009 11.2496 5.41009 11.2496 5.00009V3.00009C11.2496 2.59009 11.5896 2.25009 11.9996 2.25009C12.4096 2.25009 12.7496 2.59009 12.7496 3.00009V5.00009C12.7496 5.41009 12.4096 5.75009 11.9996 5.75009Z" fill="#FE8400"/>
                  <path d="M13.4996 5.75009H10.4996C10.0896 5.75009 9.7496 5.41009 9.7496 5.00009C9.7496 4.59009 10.0896 4.25009 10.4996 4.25009H13.4996C13.9096 4.25009 14.2496 4.59009 14.2496 5.00009C14.2496 5.41009 13.9096 5.75009 13.4996 5.75009Z" fill="#FE8400"/>
                  <path d="M8.9996 15.7501H5.9996C5.5896 15.7501 5.2496 15.4101 5.2496 15.0001C5.2496 14.5901 5.5896 14.2501 5.9996 14.2501H8.9996C9.4096 14.2501 9.7496 14.5901 9.7496 15.0001C9.7496 15.4101 9.4096 15.7501 8.9996 15.7501Z" fill="#FE8400"/>
                  <path d="M17.9996 15.7501H14.9996C14.5896 15.7501 14.2496 15.4101 14.2496 15.0001C14.2496 14.5901 14.5896 14.2501 14.9996 14.2501H17.9996C18.4096 14.2501 18.7496 14.5901 18.7496 15.0001C18.7496 15.4101 18.4096 15.7501 17.9996 15.7501Z" fill="#FE8400"/>
                </svg>
                <span>Wynajem</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'user-settings'}" class="flex gap-3 items-center p-8 ml-5 rounded-l-full bg-layout-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8066 7.62358L20.1842 6.54349C19.6576 5.62957 18.4907 5.31429 17.5755 5.83869V5.83869C17.1399 6.09531 16.6201 6.16812 16.1307 6.04106C15.6413 5.91399 15.2226 5.59749 14.9668 5.16134C14.8023 4.88412 14.7139 4.56836 14.7105 4.24601V4.24601C14.7254 3.72919 14.5304 3.22837 14.17 2.85764C13.8096 2.48691 13.3145 2.27783 12.7975 2.27805H11.5435C11.0369 2.27804 10.5513 2.47988 10.194 2.83891C9.83666 3.19795 9.63715 3.68456 9.63959 4.19109V4.19109C9.62457 5.23689 8.77246 6.07678 7.72654 6.07667C7.40419 6.07332 7.08843 5.98491 6.81121 5.82038V5.82038C5.89604 5.29598 4.72909 5.61126 4.20252 6.52519L3.53432 7.62358C3.00839 8.53636 3.31938 9.70258 4.22998 10.2323V10.2323C4.82188 10.574 5.18651 11.2056 5.18651 11.889C5.18651 12.5725 4.82188 13.204 4.22998 13.5458V13.5458C3.32053 14.0719 3.0092 15.2353 3.53432 16.1453V16.1453L4.1659 17.2346C4.41262 17.6798 4.82658 18.0083 5.31617 18.1474C5.80576 18.2866 6.33062 18.2249 6.7746 17.976V17.976C7.21106 17.7213 7.73117 17.6515 8.21932 17.7822C8.70747 17.9128 9.12321 18.233 9.37414 18.6716C9.53867 18.9489 9.62709 19.2646 9.63043 19.587V19.587C9.63043 20.6435 10.4869 21.5 11.5435 21.5H12.7975C13.8505 21.5 14.7055 20.6491 14.7105 19.5961V19.5961C14.7081 19.088 14.9088 18.6 15.2681 18.2407C15.6274 17.8814 16.1155 17.6806 16.6236 17.6831C16.9452 17.6917 17.2596 17.7797 17.5389 17.9394V17.9394C18.4517 18.4653 19.6179 18.1543 20.1476 17.2437V17.2437L20.8066 16.1453C21.0617 15.7075 21.1317 15.186 21.0012 14.6963C20.8706 14.2067 20.5502 13.7893 20.111 13.5366V13.5366C19.6717 13.2839 19.3514 12.8665 19.2208 12.3769C19.0902 11.8873 19.1602 11.3658 19.4153 10.9279C19.5812 10.6383 19.8214 10.3982 20.111 10.2323V10.2323C21.0161 9.70286 21.3264 8.54346 20.8066 7.63274V7.63274V7.62358Z" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1751 14.5252C13.631 14.5252 14.8112 13.3449 14.8112 11.889C14.8112 10.4331 13.631 9.25287 12.1751 9.25287C10.7191 9.25287 9.5389 10.4331 9.5389 11.889C9.5389 13.3449 10.7191 14.5252 12.1751 14.5252Z" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Ustawienia</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
        <button class="flex gap-3 items-center p-8 ml-5 self-start" @click="handleLogout">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.90039 7.56023C9.21039 3.96023 11.0604 2.49023 15.1104 2.49023H15.2404C19.7104 2.49023 21.5004 4.28023 21.5004 8.75023V15.2702C21.5004 19.7402 19.7104 21.5302 15.2404 21.5302H15.1104C11.0904 21.5302 9.24039 20.0802 8.91039 16.5402" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 12H3.62" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.85 8.65002L2.5 12L5.85 15.35" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Wyloguj się</span>
        </button>
      </aside>
      <main class="col-start-2 overflow-y-scroll">
        <slot/>
      </main>
    </div>
</template>