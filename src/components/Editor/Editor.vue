<template>
    <div class="main-container">
        <a-textarea
            class="input-container"
            v-model="content"
            placeholder="Please enter something"
            auto-size
        />
        <div class="preview-container">
            <a-collapse expand-icon-position="right" v-model:active-key="level1Expand">
                <a-collapse-item :key="index+''" v-for="(item, index) in complieData" >
                    <template #header>
                        <a-space>
                            <a-progress type="circle" size="mini" :percent="getPercent(index)" />
                            <span
                                :class="{ 'line-through': index < currentStep[0] }"
                            >{{ item.title }}</span>
                        </a-space>
                    </template>

                    <a-collapse expand-icon-position="right" ref="collapseRef" v-model:active-key="level2Expand" >
                        <a-collapse-item
                            :key="index + '-' + index2"
                            v-for="(item2, index2) in item.children"
                            :disabled="isDisable(index, index2)"
                        >
                            <template #header>
                                <span
                                    :class="{ 'line-through': isFinish(index, index2) }"
                                >{{ item2.title }}{{index + '-' + index2}}</span>
                            </template>
                            <div v-html="item2.content" />
                            <div class="flex justify-end" v-if="isCurrentStep(index, index2)">
                                <a-button type="primary" @click="nextStep">下一步</a-button>
                            </div>
                        </a-collapse-item>
                    </a-collapse>
                </a-collapse-item>
            </a-collapse>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import 'highlight.js/styles/atom-one-dark.css'
import './modest.scss'

import useStep from './hooks/useStep'
import useRender from './hooks/useRender'

const { content, complieData } = useRender()
const {
	level1Expand, level2Expand, currentStep, nextStep, isCurrentStep, isFinish, isDisable, getPercent
} = useStep(complieData)

const collapseRef = ref()
onMounted(() => {
	console.log(collapseRef.value)
})

</script>

<style lang="scss" scoped>
.main-container {
    display: flex;
    .preview-container,
    .input-container {
        width: 50%;
        padding: 10px;
        margin: 0;
        height: 100vh;
        overflow: scroll;
    }

    .preview-container {
        border: whitesmoke 1px solid;
    }
}
:deep(.arco-collapse-item-content) {
    padding-left: 14px;
}
</style>
