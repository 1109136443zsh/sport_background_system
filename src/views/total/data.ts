import {getNewCustomsList,getIncomeNum,getOrderNum} from "@/api/total";
import {ref} from "vue";
import dayjs from "dayjs";


export const newCustomsData = ref({
  date: [],
  count: []
})

const { data:{detail} } = await getNewCustomsList();
console.log(detail)

const dates = [];
const counts = [];

for (const item of detail) {
  dates.push(dayjs(item[0]).format("YYYY-MM-DD HH:mm:ss"));
  counts.push(parseInt(item[1],10));
}

newCustomsData.value.date = dates;
newCustomsData.value.count = counts;


