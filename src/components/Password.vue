<template>
  <div class="bg-white py-16 sm:py-24">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
        <h2 class="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">How Secure is
          your password!</h2>
        <p class="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">Test how long it would take to crack
          your password here</p>
        <div v-if="!isCracking && elapsedTime === 0" class="mx-auto mt-10 flex max-w-md gap-x-4">
          <label class="sr-only">Password</label>
          <input v-model="knownPassword" v-on:keyup.enter="start()" maxlength="5"
            class="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="Enter your password to test" />
          <button @click="start()"
            class="flex-none rounded-md bg-white py-2.5 px-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Brute
            Force!</button>
        </div>
        <div v-else-if="isCracking && elapsedTime === 0" class="text-align">
          <img class="m-auto" src="../assets/robot.gif" height="200" width="200">
          <p>Dum.... Dummm Dummm</p>
        </div>
        <div v-else class="text-align">
          <img class="m-auto" src="../assets/finished.gif" height="200" width="200">
          <p>I broke your password in {{ elapsedTime }} seconds</p>
        </div>
        <svg viewBox="0 0 1024 1024" class="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
          aria-hidden="true">
          <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)">
              <stop stop-color="#7775D6" />
              <stop offset="1" stop-color="#E935C1" stop-opacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { isGloballyWhitelisted } from '@vue/shared';


export default {
  setup() {
    return {
    };
  },
  data() {
    return {
      knownPassword: '',
      // charset: "0123456789",
      // charset: "abcdefghijklmnopqrstuvwxyz",
      charset: "abcdefghijklmnopqrstuvwxyz0123456789",
      // charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      // charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      // charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789[\]^_`{|} !\"#$%&'()*+,-./:;<=>?@~",

      passwordsChecked: 0,
      isCracking: false,
      elapsedTime: 0
    };
  },
  methods: {
    bruteForce() {
      const nodes = [];
      const lastChar = this.charset[this.charset.length - 1];

      while (true) {
        this.passwordsChecked++
        const currentNode = nodes[nodes.length - 1];
        if (currentNode === lastChar) {
          for (let i = nodes.length; i > 0; i--) {
            if (nodes[i - 1] === lastChar) {
              nodes[i - 1] = this.charset[0];

              if (i === 1) {
                //Add next level as all chars were reset back to 'a'
                nodes.push(this.charset[0]);
                console.log(`Password length ${nodes.length}, passwords checked so far ${this.passwordsChecked}`)
              }
            }
            else {
              nodes[i - 1] = this.charset[this.charset.indexOf(nodes[i - 1]) + 1];
              break;
            }
          }

        }
        else {
          nodes.pop();
          nodes.push(this.charset[this.charset.indexOf(currentNode) + 1]);
        }

        if (nodes.join('') === this.knownPassword) {
          console.log('Password cracked!');
          return true;
        }
      }
    },
    async start() {

      this.isCracking = true
      await new Promise(r => setTimeout(r, 100)); // Give some time for the gif to load

      console.log('start')
      const start = Date.now();
      this.bruteForce();

      this.isCracking = false
      this.elapsedTime = (Date.now() - start) / 100
      console.log(`${this.elapsedTime} seconds to crack your password!`);
    }
  }
};

</script>