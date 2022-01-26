<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <header>
    <!-- GoC Banner -->
    <div class="bg-black">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
        <img class="hidden sm:block h-5 w-auto" src="~assets/goc--header-logo.svg" alt="Government of Canada">
        </div>
      </div>
    </div>
    <!-- CDS Banner-->
    <nav class="bg-black border-cds-yellow border-t-2 text-white">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <img class="hidden sm:block h-12 w-auto" src="~assets/cds-lockup-ko-en.svg" alt="CDS">
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link v-if="$i18n.locale == 'fr'" theme="dark" :to="switchLocalePath('en')">English</Link>
            <Link v-else-if="$i18n.locale == 'en'" theme="dark" :to="switchLocalePath('fr')">Français</Link>
          </div>
        </div>
      </div>
    </nav>
    
  </header>
</template>