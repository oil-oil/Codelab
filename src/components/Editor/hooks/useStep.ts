import { nextTick, Ref, ref } from 'vue'
import { complieData } from '../complieAst'

export default function useStep (complieData: Ref<complieData>) {
	const currentStep = ref([0, 0])
	const levelExpand = ref(['0-0'])
	const nextStep = () => {
		if (
			complieData.value[currentStep.value[0]].children.length - 1 ===
      currentStep.value[1]
		) {
			currentStep.value[0]++
			currentStep.value[1] = 0
		} else {
			currentStep.value[1]++
		}

		levelExpand.value = ['0-' + currentStep.value[1]]
	}

	const isCurrentStep = (level1Step: number, level2Step: number) => {
		return (
			level1Step === currentStep.value[0] && level2Step === currentStep.value[1]
		)
	}

	const isFinish = (level1Step: number, level2Step: number) => {
		if (
			(level1Step === currentStep.value[0] &&
        level2Step < currentStep.value[1]) ||
      level1Step < currentStep.value[0]
		) {
			return true
		} else {
			return false
		}
	}

	const isDisable = (level1Step: number, level2Step: number) => {
		if (
			(level1Step === currentStep.value[0] &&
        level2Step > currentStep.value[1]) ||
      level1Step < currentStep.value[0]
		) {
			return true
		}
		return false
	}

	const getPercent = (index: number) => {
		if (index > currentStep.value[0]) {
			return 0
		} else {
			return index < currentStep.value[0]
				? 100
				: parseFloat((currentStep.value[1] / (complieData.value[index].children.length - 1)).toFixed(1))
		}
	}

	return {
		levelExpand,
		currentStep,
		nextStep,
		isCurrentStep,
		isFinish,
		isDisable,
		getPercent
	}
}
