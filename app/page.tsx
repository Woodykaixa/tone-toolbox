"use client";

import { useState } from "react";
import {
	isValidTone,
	tones,
	useTones as playTones,
	toneFreq,
} from "@/tone-utils";
import {
	Button,
	Form,
	InputNumber,
	Select,
	SelectProps,
	Space,
	notification,
} from "antd";
const toneOptions: SelectProps["options"] = tones.map((t) => ({
	label: t,
	value: t,
}));
const defaultFormValue = {
	bpm: 60,
	tones: ["C4"],
	toneCount: 3,
	firstTone: undefined as string | undefined,
};
export default function Home() {
	const [playFn, setPlayFn] = useState<(() => void) | null>(null);
	const [answer, setAnswer] = useState("");

	return (
		<div className="flex flex-col p-4">
			<Form
				initialValues={defaultFormValue}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				onValuesChange={() => {
					setPlayFn(null);
				}}
				onFinish={(values: typeof defaultFormValue) => {
					const tones = [] as string[];
					const candidate = [...values.tones];
					if (isValidTone(values.firstTone)) {
						tones.push(values.firstTone!);
					}
					while (tones.length < values.toneCount) {
						const index = Math.floor(Math.random() * candidate.length);
						tones.push(...candidate.splice(index, 1));
					}
					const play = playTones(
						values.bpm,
						tones.map((t) => toneFreq.get(t)!)
					);

					setPlayFn(() => play);
					setAnswer(tones.join("、"));
					play();
				}}
			>
				<Form.Item
					label="BPM"
					name="bpm"
					rules={[
						{
							required: true,
							max: 100,
							min: 1,
							type: "number",
						},
					]}
				>
					<InputNumber max={100} min={1} />
				</Form.Item>
				<Form.Item
					label="音高"
					name="tones"
					rules={[
						{
							required: true,
							max: 10,
							min: 2,
							type: "array",
						},
					]}
				>
					<Select
						options={toneOptions}
						showSearch
						allowClear
						mode="multiple"
						optionFilterProp="label"
					></Select>
				</Form.Item>
				<Form.Item label="首个音符音高" name="firstTone">
					<Select
						options={toneOptions}
						showSearch
						allowClear
						optionFilterProp="label"
					></Select>
				</Form.Item>
				<Form.Item
					label="音符数量"
					name="toneCount"
					rules={[
						{
							required: true,
							max: 10,
							min: 2,
							type: "number",
						},
					]}
				>
					<InputNumber max={10} min={2} />
				</Form.Item>
				<Form.Item>
					<Space>
						<Button htmlType="submit" type="primary">
							开始
						</Button>
						{playFn && (
							<>
								<Button
									onClick={() => {
										playFn?.();
									}}
								>
									重新播放
								</Button>
								<Button
									onClick={() => {
										notification.success({
											message: answer,
										});
									}}
								>
									查看答案
								</Button>
							</>
						)}
					</Space>
				</Form.Item>
			</Form>
		</div>
	);
}
