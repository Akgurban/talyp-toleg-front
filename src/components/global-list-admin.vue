<template>
  <div class="w-full">
    <div class="card flex justify-start mb-2 gap-1 w-full">
      <!-- <Button label="Show" @click="visible = true" /> -->
      <PopupFacultyAdd class="max-w-[30%]"></PopupFacultyAdd>
      <PopupGroupAdd class="max-w-[20%]" v-if="route.query.f"></PopupGroupAdd>
      <PopupStudentAdd class="max-w-[50%]" v-if="route.query.g"></PopupStudentAdd>
    </div>
    <div ref="dropdownMenu" class="flex items-start w-full">
      <div
        ref="dropdownMenu"
        class="border divide-y-[1px] border-[#0E2C75] divide-[#0E2C75] w-[30%]"
      >
        <div class="relative" v-for="item in faculties" :key="item.facultyName">
          <div
            @click="selectFaculty(item)"
            :class="route.query.f == item.facultyID ? 'bg-[#0E2C7533]' : ''"
            class="p-3 hover:bg-[#0E2C7533] flex items-center font-medium text-[17px] text-[#0E2C75]"
          >
            <div>
              {{ item.facultyName }}
            </div>
            <base-icon name="chevron" class="inline"></base-icon>
            <PopupFacultyEdit :facultyData="item"></PopupFacultyEdit>
          </div>
          <!-- toparlar -->
        </div>
      </div>
      <div
      v-if="route.query.f"
        class="border divide-y-[1px] border-[#0E2C75] divide-[#0E2C75] w-[20%]"
      >
        <div
          class="relative"
          v-for="sub in props.groups"
          :key="sub.groupID"
          @click="selectGroup(sub)"
        >
          <div
            :class="route.query.g == sub.groupID ? 'bg-[#0E2C7533]' : ''"
            class="p-3 hover:bg-[#0E2C7533] flex items-center font-medium text-[17px] text-[#0E2C75]"
          >
            {{ sub.groupCode }}
            <BaseIcon name="chevron" class="inline"></BaseIcon>
            <PopupGroupEdit :groupData="sub"></PopupGroupEdit>
          </div>
        </div>
      </div>
      <div
      v-if="route.query.g"
        class="border divide-y-[1px] border-[#0E2C75] divide-[#0E2C75] w-[50%]"
      >
        <div
          class="relative"
          v-for="stud in props.students"
          :key="stud"
          @click="selectStudent(stud)"
        >
          <div
            :class="stud.selected ? 'bg-[#0E2C7533]' : ''"
            class="p-3 hover:bg-[#0E2C7533] flex items-center font-medium text-[17px] text-[#0E2C75]"
          >
            {{ stud.name }}
            {{ stud.surname }} 
            <BaseIcon name="chevron" class="inline"></BaseIcon>
            <PopupStudentEdit :studentData="stud"></PopupStudentEdit>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRef } from "vue";
import BaseIcon from "./base/base-icon.vue";
import { useRoute, useRouter } from "vue-router";
import { Dialog, InputText } from "primevue";
import PopupFacultyEdit from "./popup/popupFacultyEdit.vue";
import PopupFacultyAdd from "./popup/popupFacultyAdd.vue";
import PopupGroupAdd from "./popup/popupGroupAdd.vue";
import PopupStudentAdd from "./popup/popupStudentAdd.vue";
import PopupGroupEdit from "./popup/popupGroupEdit.vue";
import PopupStudentEdit from "./popup/popupStudentEdit.vue";
const router = useRouter();
const route = useRoute();
const props = defineProps({
  faculties: {
    type: Array,
    required: true,
  },
  groups: {
    type: Array,
    required: true,
  },
  students: {
    type: Array,
    required: true,
  },
});

const modelList = toRef(props.model);
const dropdownMenu = ref();
const visible = ref(false);

const selectFaculty = (e) => {
  router.push({
    path: `/admin/dashboard`,
    query: {
      f: e.facultyID,
    },
  });
};
const selectGroup = (e) => {
  router.push({
    path: `/admin/dashboard`,
    query: {
      f: route.query.f,
      g: e.groupID,
    },
  });
};
const selectStudent = (e) => {
  router.push(`/admin/student/${e.id}`);
};
</script>

<style lang="scss" scoped>
</style>