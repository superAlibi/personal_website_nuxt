<script setup lang="ts">
const { meta: userInfo } = useRoute()
</script>
<template>
  <div class="max-w-7xl p-4 mx-auto flex flex-col gap-4">
    {req.method === "POST" &&
    (
    <dialog open popover id="message-result"
      class="flex w-screen h-screen bg-slate-800 bg-opacity-30 dark:bg-slate-400 dark:bg-opacity-30  fixed inset-0 z-50 justify-center   items-center  md:inset-4 h-modal">

      <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 xs:p-5">
        <form>
          <!--  <button
            class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd">
              </path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>  -->

          <div
            class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
            <svg aria-hidden="true" class="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor"
              viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd">
              </path>
            </svg>
            <span class="sr-only">成功</span>
          </div>
          <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            您的留言已收到,我会尽快回复您
            <br />
            祝您今天快乐!
          </p>
          <button popovertarget="message-result" popovertargetaction="hide"
            class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900">
            继续
          </button>
          <input type="hidden" name="st" value={st} />
        </form>
      </div>
    </dialog>
    )}
    <dialog popover id="dialog" aria-hidden="true"
      class="max-w-2xl rounded-lg backdrop:bg-gray-600 backdrop:bg-opacity-40 dark:bg-gray-100   overflow-y-auto overflow-x-hidden  z-50 justify-center items-center xs:inset-4">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

        <div class="flex items-center justify-center p-4">
          <img class="w-96" src="/mmqrcode1722703093812.png" />
        </div>
      </div>
    </dialog>

    <div class="mt-6">
      <div
        class="grid grid-cols-2 xs:grid-cols-1 items-start gap-14 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md font-[sans-serif]  dark:bg-gray-800 dark:border-gray-700 ">
        <div>
          <h1 class="text-gray-800 text-3xl font-extrabold dark:text-white">
            交个朋友
          </h1>
          <p class="text-sm text-gray-500 mt-4">
            有一个吊炸天的想法或项目需要开发吗？可以联系我,我很乐意了解您的项目并提供支持
          </p>

          <div class="mt-12">
            <h2 class="text-gray-800 text-base font-bold  dark:text-white">
              邮箱
            </h2>
            <ul class="mt-4">
              <li class="flex items-center">
                <div class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff"
                    viewBox="0 0 479.058 479.058">
                    <path
                      d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                      data-original="#000000" />
                  </svg>
                </div>
                <a :href="`mailto:${userInfo.email}`"
                  class="text-blue-600 text-sm ml-4 hover:text-blue-700 rounded px-2 dark:text-blue-500 dark:hover:text-blue-600">
                  <small class="block">Mail</small>
                  <strong class=" ">
                    {{ userInfo.email }}
                  </strong>
                </a>
              </li>
            </ul>
          </div>

          <div v-if="userInfo.phone" class="mt-12 hidden xs:block">
            <h2 class="text-gray-800 text-base font-bold dark:text-white">
              手机
            </h2>
            <ul class="mt-4">
              <li class="flex items-center">
                <div class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <svg class="size-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12">
                    <path fill="#007bff"
                      d="M5.561 2.551a.84.84 0 0 0-1.033-.514c-.973.3-1.653 1.135-1.507 2.101A8.7 8.7 0 0 0 4.092 7.18a8.8 8.8 0 0 0 2.083 2.445c.754.61 1.812.442 2.558-.258A.85.85 0 0 0 8.81 8.21l-.534-.653a.845.845 0 0 0-.91-.272l-1.232.39l-.215-.222a5 5 0 0 1-.706-.929a4.8 4.8 0 0 1-.446-1.079l-.083-.295l.95-.875a.86.86 0 0 0 .221-.935zm-1.327-1.47a1.84 1.84 0 0 1 2.264 1.121l.293.788a1.86 1.86 0 0 1-.48 2.019l-.49.451c.063.174.148.373.258.566c.11.19.238.363.355.504l.63-.2a1.845 1.845 0 0 1 1.985.593l.534.653a1.85 1.85 0 0 1-.166 2.52c-.994.933-2.617 1.32-3.87.306a9.8 9.8 0 0 1-2.32-2.722a9.7 9.7 0 0 1-1.195-3.393c-.24-1.593.903-2.806 2.202-3.205" />
                  </svg>
                </div>
                <a :href="`tel:+86${userInfo.phone}`"
                  class="text-blue-600 text-sm ml-4 hover:text-blue-700 rounded px-2 dark:text-blue-500 dark:hover:text-blue-600">
                  <small class="block">Telephone</small>
                  <strong class=" ">
                    {{ userInfo.phone }}
                  </strong>
                </a>
              </li>
            </ul>
          </div>


          <div class="mt-12">
            <h2 class="text-gray-800 text-base font-bold dark:text-white">
              社交账号
            </h2>

            <ul class="flex xs:flex-wrap xs:justify-center mt-4 gap-4">
              <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <button href="javascript:void(0)" popovertarget="dialog" class="text-[#007bff]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="size-6">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="1.5">
                      <path
                        d="M7 7h.009m5.982 0H13m4.991 7.5H18m-4 0h.009M10 16c0 2.761 2.686 5 6 5c.907 0 1.767-.168 2.538-.468c.189-.073.393-.1.592-.063L22 21l-.652-2.03a1.13 1.13 0 0 1 .11-.89A4.3 4.3 0 0 0 22 16c0-2.761-2.686-5-6-5s-6 2.239-6 5" />
                      <path
                        d="M17.873 11.249Q18 10.639 18 10c0-3.866-3.582-7-8-7s-8 3.134-8 7c0 1.112.297 2.164.824 3.098c.147.26.196.567.108.853L2 17l3.914-.76c.208-.041.422-.013.617.07a9 9 0 0 0 3.589.69" />
                    </g>
                  </svg>
                </button>
              </li>
              <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="https://t.me/vector_2024" class="text-[#007bff]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="size-6">
                    <path fill="currentColor"
                      d="M26.07 3.996a2.974 2.974 0 0 0-.933.223h-.004c-.285.113-1.64.683-3.7 1.547l-7.382 3.109c-5.297 2.23-10.504 4.426-10.504 4.426l.062-.024s-.359.118-.734.375a2.03 2.03 0 0 0-.586.567c-.184.27-.332.683-.277 1.11c.09.722.558 1.155.894 1.394c.34.242.664.355.664.355h.008l4.883 1.645c.219.703 1.488 4.875 1.793 5.836c.18.574.355.933.574 1.207c.106.14.23.257.379.351a1.119 1.119 0 0 0 .246.106l-.05-.012c.015.004.027.016.038.02c.04.011.067.015.118.023c.773.234 1.394-.246 1.394-.246l.035-.028l2.883-2.625l4.832 3.707l.11.047c1.007.442 2.027.196 2.566-.238c.543-.437.754-.996.754-.996l.035-.09l3.734-19.129c.106-.472.133-.914.016-1.343a1.807 1.807 0 0 0-.781-1.047a1.872 1.872 0 0 0-1.067-.27m-.101 2.05c-.004.063.008.056-.02.177v.011l-3.699 18.93c-.016.027-.043.086-.117.145c-.078.062-.14.101-.465-.028l-5.91-4.531l-3.57 3.254l.75-4.79l9.656-9c.398-.37.265-.448.265-.448c.028-.454-.601-.133-.601-.133l-12.176 7.543l-.004-.02l-5.836-1.965v-.004l-.015-.003a.27.27 0 0 0 .03-.012l.032-.016l.031-.011s5.211-2.196 10.508-4.426c2.652-1.117 5.324-2.242 7.379-3.11a807.312 807.312 0 0 1 3.66-1.53c.082-.032.043-.032.102-.032z" />
                  </svg>
                </a>
              </li>
              <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="https://matrix.to/#/@alibi_fox:mozilla.org" class="text-[#007bff]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" class="size-6">
                    <title>matrix logo white</title>
                    <desc>Created with Sketch.</desc>
                    <path fill="currentColor"
                      d="M46 46v164h18a6 6 0 0 1 0 12H40a6 6 0 0 1-6-6V40a6 6 0 0 1 6-6h24a6 6 0 0 1 0 12Zm170-12h-24a6 6 0 0 0 0 12h18v164h-18a6 6 0 0 0 0 12h24a6 6 0 0 0 6-6V40a6 6 0 0 0-6-6m-64 56a30 30 0 0 0-24 12a30 30 0 0 0-42-6a6 6 0 0 0-12 0v64a6 6 0 0 0 12 0v-40a18 18 0 0 1 36 0v40a6 6 0 0 0 12 0v-40a18 18 0 0 1 36 0v40a6 6 0 0 0 12 0v-40a30 30 0 0 0-30-30" />
                  </svg>
                </a>
              </li>
              <!-- <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="https://space.bilibili.com/37141373" class="text-[#007bff]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"
                    class="size-6">
                    <path fill="currentColor" fill-rule="evenodd"
                      d="M235.516 616.574c16.736-.741 32.287-1.778 47.69-2.074c66.797-1.185 132.409 6.814 194.762 31.998c30.51 12.296 59.984 26.517 86.495 46.516c21.772 16.444 26.512 36.887 16.588 67.108c-6.22 18.665-18.661 32.739-34.36 45.034c-37.028 28.888-75.832 54.96-120.412 69.626c-31.251 10.37-63.687 18.222-96.27 23.259c-42.803 6.666-86.2 9.629-129.447 13.628c-8.886.89-17.92-.296-26.807-.296c-4.591 0-5.776-2.37-5.924-6.37c-1.185-19.703-2.074-39.553-3.851-59.256c-2.222-25.48-4.74-50.96-7.702-76.292c-3.999-35.406-8.442-70.663-12.885-105.92c-4.592-37.184-9.331-74.22-13.774-111.403c-4.443-36.294-8.442-72.736-13.182-109.03c-5.332-41.48-11.256-82.96-16.884-124.439c-6.665-49.033-15.848-97.623-28.437-145.473c-.592-2.074 1.185-6.666 2.962-7.259c41.915-16.889 83.978-33.331 125.892-50.071c13.922-5.63 15.107-7.26 15.255 10.37c.148 75.107.444 150.214 1.63 225.321c.592 39.11 2.073 78.218 4.739 117.18c3.258 47.552 8.294 95.106 12.589 142.659c0 2.074.889 4 1.333 5.185m83.68 218.062a74372 74372 0 0 0 114.784-86.958c-4.74-6.815-109.303-47.85-133.89-53.33c6.221 46.367 12.59 92.587 19.107 140.288m434.12-14.387C733.38 618.113 716.544 413.756 678 210.584c12.553-1.481 25.106-3.258 37.806-4.295c14.62-1.332 29.388-1.925 44.009-3.11c12.257-1.036 16.835 2.222 17.574 14.217c2.215 32.134 4.135 64.268 6.35 96.403c2.953 43.388 6.055 86.925 9.156 130.314c2.215 31.246 4.135 62.64 6.646 93.886c2.805 34.207 5.907 68.267 9.008 102.474c2.215 25.175 4.283 50.497 6.793 75.672c2.658 27.247 5.612 54.495 8.418 81.742c.738 7.849 1.624 15.697 2.215 23.546c.296 4.294-2.067 4.887-6.055 4.442c-21.709-2.221-43.418-3.85-66.603-5.627M572 527.155c17.616-2.517 34.639-5.33 51.662-7.254c12.287-1.48 24.721-1.629 37.008-2.813c6.661-.593 10.954 1.776 11.99 8.29c2.813 17.322 5.773 34.79 7.846 52.26c3.405 29.017 6.07 58.182 9.178 87.199c2.664 25.464 5.329 50.78 8.29 76.243c3.256 27.24 6.809 54.333 10.213 81.425c1.037 7.995 1.777 16.137 2.813 24.872A9507 9507 0 0 0 636.245 857C614.929 747.15 593.612 638.189 572 527.155m382 338.821c-24.084 0-47.276.148-70.468-.296c-1.933 0-5.352-3.409-5.501-5.484c-3.568-37.05-6.69-73.953-9.96-111.004l-9.367-103.149c-3.27-35.42-6.393-70.841-9.663-106.262c-.149-2.074-.595-4.001-1.041-7.113c8.623-1.038 16.8-2.668 25.125-2.668c22.449 0 44.897.593 67.495 1.186c5.798.148 8.325 4.001 8.623 9.336c.743 11.116 1.784 22.083 1.784 33.198c.148 52.167-.149 104.483.297 156.65c.446 41.646 1.784 83.439 2.676 125.084zM622.069 480c-5.307-42.568-10.614-84.102-16.069-127.409c13.857-.148 27.715-.591 41.425-.591c4.57 0 6.634 2.513 7.076 7.538c3.686 38.725 7.519 77.45 11.499 117.654c-14.3.739-29.042 1.773-43.931 2.808M901 364.066c11.937 0 24.619-.148 37.45 0c6.417.148 9.55 2.672 9.55 10.244c-.448 36.224-.15 72.449-.15 108.525V491c-15.367-.742-30.139-1.485-46.7-2.227c-.15-41.124-.15-82.396-.15-124.707M568.569 489c-7.424-41.193-14.996-82.091-22.569-124.023c13.512-2.067 27.023-4.282 40.387-5.906c5.939-.738 4.9 4.43 5.197 7.678c1.633 13.879 2.82 27.61 4.305 41.488c2.376 21.704 4.752 43.408 6.979 64.965c.297 2.805 0 5.758 0 8.859c-11.284 2.362-22.569 4.577-34.299 6.939M839 365.16c12.718 0 25.435.148 38.004-.148c5.685-.149 7.78 1.038 7.63 7.563c-.449 17.352.15 34.704.3 52.204c.15 21.505 0 43.157 0 64.513c-12.868 1.335-24.09 2.373-36.209 3.708c-3.142-41.97-6.433-83.793-9.725-127.84" />
                  </svg>
                </a>
              </li> -->
              <!-- <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="javascript:void(0)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff" viewBox="0 0 24 24">
                    <path
                      d="M6.812 13.937H9.33v9.312c0 .414.335.75.75.75l4.007.001a.75.75 0 0 0 .75-.75v-9.312h2.387a.75.75 0 0 0 .744-.657l.498-4a.75.75 0 0 0-.744-.843h-2.885c.113-2.471-.435-3.202 1.172-3.202 1.088-.13 2.804.421 2.804-.75V.909a.75.75 0 0 0-.648-.743A26.926 26.926 0 0 0 15.071 0c-7.01 0-5.567 7.772-5.74 8.437H6.812a.75.75 0 0 0-.75.75v4c0 .414.336.75.75.75zm.75-3.999h2.518a.75.75 0 0 0 .75-.75V6.037c0-2.883 1.545-4.536 4.24-4.536.878 0 1.686.043 2.242.087v2.149c-.402.205-3.976-.884-3.976 2.697v2.755c0 .414.336.75.75.75h2.786l-.312 2.5h-2.474a.75.75 0 0 0-.75.75V22.5h-2.505v-9.312a.75.75 0 0 0-.75-.75H7.562z"
                      data-original="#000000" />
                  </svg>
                </a>
              </li>
              <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="javascript:void(0)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff"
                    viewBox="0 0 511 512">
                    <path
                      d="M111.898 160.664H15.5c-8.285 0-15 6.719-15 15V497c0 8.285 6.715 15 15 15h96.398c8.286 0 15-6.715 15-15V175.664c0-8.281-6.714-15-15-15zM96.898 482H30.5V190.664h66.398zM63.703 0C28.852 0 .5 28.352.5 63.195c0 34.852 28.352 63.2 63.203 63.2 34.848 0 63.195-28.352 63.195-63.2C126.898 28.352 98.551 0 63.703 0zm0 96.395c-18.308 0-33.203-14.891-33.203-33.2C30.5 44.891 45.395 30 63.703 30c18.305 0 33.195 14.89 33.195 33.195 0 18.309-14.89 33.2-33.195 33.2zm289.207 62.148c-22.8 0-45.273 5.496-65.398 15.777-.684-7.652-7.11-13.656-14.942-13.656h-96.406c-8.281 0-15 6.719-15 15V497c0 8.285 6.719 15 15 15h96.406c8.285 0 15-6.715 15-15V320.266c0-22.735 18.5-41.23 41.235-41.23 22.734 0 41.226 18.495 41.226 41.23V497c0 8.285 6.719 15 15 15h96.403c8.285 0 15-6.715 15-15V302.066c0-79.14-64.383-143.523-143.524-143.523zM466.434 482h-66.399V320.266c0-39.278-31.953-71.23-71.226-71.23-39.282 0-71.239 31.952-71.239 71.23V482h-66.402V190.664h66.402v11.082c0 5.77 3.309 11.027 8.512 13.524a15.01 15.01 0 0 0 15.875-1.82c20.313-16.294 44.852-24.907 70.953-24.907 62.598 0 113.524 50.926 113.524 113.523zm0 0"
                      data-original="#000000" />
                  </svg>
                </a>
              </li> -->
            </ul>
          </div>
        </div>

        <form method="post" class="ml-auo space-y-4">
          <input type="hidden" name="st" value={st} />
          <div class="relative">
            <input type="text" id="nickname" name="nickName"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="" />
            <label for="nickname"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              该怎么称呼您
            </label>
          </div>
          <!-- <input type="text" name="nickname" placeholder="该怎么称呼您"
            class="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-blue-500" /> -->
          <div class="relative">
            <input type="email" name="email" id="email"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="" />
            <label for="email"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              邮箱是最通用的联系方式
            </label>
          </div>
          <!-- <input type="email" name="email" placeholder="邮箱是最通用的联系方式"
            class="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-blue-500" /> -->
          <div class="relative">
            <input type="text" name="subject" id="subject"
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="" />
            <label for="subject"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              主题
            </label>
          </div>
          <!-- <input type="text" name="subject" placeholder="主题"
            class="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-blue-500" /> -->
          <div class="relative">
            <textarea name="message" id="message" rows={4}
              class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="" />
            <label for="message"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              愿听其详
            </label>
          </div>
          <!-- <textarea placeholder="愿听其详" rows={6} name="message"
            class="w-full text-gray-800 rounded-md px-4 border text-sm pt-2.5 outline-blue-500">
            </textarea>  -->
          <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">
            我信任你,不会写一些奇怪的东西...
          </p>

          <button :formaction="`/resume/contacts?st=${userInfo.st}`"
            class="text-white bg-blue-500 hover:bg-blue-600 rounded-md text-sm px-4 py-3 w-full !mt-6">
            发送
          </button>
        </form>
      </div>
    </div>

    <!-- <JumpBotron />  -->
  </div>
</template>