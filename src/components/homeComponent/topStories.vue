<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable prettier/prettier -->
<script setup>
import { ref, onMounted } from 'vue';
import { useHnaStore } from "@/stores/modules/hnaStore/index"
import HsnService from '@/service/HsnService';

const dataviewValue = ref(null);
const layout = ref('grid');
const sortOrder = ref(null);
const sortField = ref(null);
const openCommentsDrawer  = ref(false);

const data=ref({
    topStories:[],
    pastStories:[],
    commentsOnStory:[],
});

function openComments(id){
    useHnaStore().getCommentsOnStory(id).then((res)=> {
        data.value.commentsOnStory = [...res]
        openCommentsDrawer.value = true
    })
}


const hsnService = new HsnService();
onMounted(() => {
    hsnService.getProductsSmall().then((api_data) => (dataviewValue.value = api_data));
    useHnaStore().getTopStoriesData().then((api_data) => (data.value.topStories=api_data));
    useHnaStore().getPastStoriesData().then((api_data) => (data.value.pastStories=api_data));
});

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <DataView :value="data.topStories" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
                    <template #header>
                        <div class="grid grid-nogutter" style="display: flex; align-items: center; justify-content: space-between">
                            <h4 style="margin: 0">Top Stories</h4>
                            <DataViewLayoutOptions v-model="layout" />
                        </div>
                    </template>
                    <template #list="slotProps">
                        <div class="col-12">
                            <div class="flex flex-column md:flex-row align-items-center p-3 w-full">
                                <img :src="'demo/images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
                                <div class="flex-1 text-center md:text-left">
                                    <div class="font-bold text-2xl">{{ slotProps.data.name }}</div>
                                    <div class="mb-3">{{ slotProps.data.description }}</div>
                                    <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" class="mb-2"></Rating>
                                    <div class="flex align-items-center">
                                        <i class="pi pi-tag mr-2"></i>
                                        <span class="font-semibold">{{ slotProps.data.category }}</span>
                                    </div>
                                </div>
                                <div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                                    <span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">${{ slotProps.data.price }}</span>
                                    <!-- <Button icon="pi pi-shopping-cart" label="Add to Cart" :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'" class="mb-2"></Button> -->
                                    <Button label="Info Comments" :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'" class="mb-2" severity="info"></Button>
                                    <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">{{ slotProps.data.inventoryStatus }}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #grid="slotProps">
                        <div class="col-12 md:col-4">
                            <div class="card m-3 border-1 surface-border">
                                <div class="flex align-items-center justify-content-between">
                                    <div class="flex align-items-center mb-2">
                              
                                        <span class="font-bold">{{ slotProps.data.title }}</span>
                                    </div>
                                </div>
                                
                               
                                <div class="mb-2">Total comments: {{ slotProps.data.totalComments }}</div>
                                <div>
                                    <div>
                                      <p class="mb-2">
                                        Votes: {{ slotProps.data.votes }}
                                      </p> 
                                    </div>
                                    <div class="mb-2">
                                        Date: {{ slotProps.data.time }}
                                    </div>
                                </div>
                                <div class="flex align-items-center justify-content-center m-4">
                                    <Button label="Comments" :disabled="!slotProps.data.commentsIds" severity="info" @click="openComments(slotProps.data.id)"></Button>
                                </div>
                                <div class="text-center">
                                    <a :href="slotProps.data.url" target="_blank">See Story</a>
                                </div>
                            </div>

                            
                        </div>
                    </template>
                </DataView>
            </div>
        </div>
        <Dialog v-model:visible="openCommentsDrawer" modal header="Comments" :style="{ width: '50vw' }">
            <div v-for="(data, index) in data.commentsOnStory" :key="index">
                <Card class="mb-4">
        <template #title>
            <p> {{ data.createdBy.userName }}</p>
             
             </template>
             <template #content>
    <p>
        <b class="text-lg">
            Comment:
        </b>
        <span v-html="data.text"></span>
    </p>
    <div class="flex justify-content-end">
        <p>
            <b>Total Reply</b> {{ data.totalComments }}
        </p>
    </div>
</template>
    </Card>

            </div>

</Dialog>
    </div>
</template>
