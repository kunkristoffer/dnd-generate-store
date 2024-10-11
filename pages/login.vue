<script setup lang="ts">
  import { GoogleAuthProvider } from 'firebase/auth'
  import { signInWithPopup } from 'firebase/auth'
  import { useFirebaseAuth } from 'vuefire'

  const googleAuthProvider = new GoogleAuthProvider()
  const auth = useFirebaseAuth()!

  function signinPopup() {
    signInWithPopup(auth, googleAuthProvider).catch((reason) => {
      console.error('Failed sign', reason)
    }).then(async() => await navigateTo('/'))
  }
</script>

<template>
  <main class="relative grid place-content-center flex-1 p-4 bg-slate-700 text-white">
    <button class="px-8 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 active:bg-slate-500" @click="signinPopup()">Sign-in with Google</button>
  </main>
</template>