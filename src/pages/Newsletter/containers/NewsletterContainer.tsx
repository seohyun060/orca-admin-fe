import React, { useCallback, useEffect, useState } from 'react';
import Newsletter from '../Newsletter';
import { Newsletters } from '@typedef/types';
import { getNewsletters, deleteNewsletter } from 'src/api/NewsletterAPI';
import * as XLSX from 'xlsx';
import { setMaxListeners } from 'events';
type Props = {};

const NewsletterContainer = (props: Props) => {
	const [newsletterList, setNewsletterList] = useState<Newsletters[]>([]);
	const downloadExcel = (data: Newsletters[]) => {
		// 데이터를 이차원 배열로 변환
		const dataArray = [
			['Index', 'ID', 'Email'], // 라벨 배열
			...data.map((newsletter, index) => [
				index + 1,
				newsletter.id,
				newsletter.email,
			]),
		];
		// 워크북 생성
		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.aoa_to_sheet(dataArray);

		// 워크북에 워크시트 추가
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		// 엑셀 파일 생성 및 다운로드
		XLSX.writeFile(wb, 'newsletter.xlsx');
	};
	const onTrashClick = useCallback(
		(id: number) => {
			setNewsletterList((prevList: Newsletters[]) => {
				const updatedList = prevList.filter(
					(newsletter) => newsletter.id !== id,
				);
				return updatedList;
			});
			deleteNewsletter(id);
		},
		[newsletterList],
	);
	useEffect(() => {
		getNewsletters().then((data) => {
			console.log(data.data); // 나옴
			const updatedList = data.data;
			setNewsletterList(updatedList);
		});

		return () => {};
	}, []);
	// useEffect(() => {
	// 	const updatedList = [];
	// 	for (let i = 0; i < 8; i++) {
	// 		const newsletter = {
	// 			id: i + 1,
	// 			email: 'fjal;k@asfmdal.o.kr',
	// 		};
	// 		updatedList.push(newsletter);
	// 	}
	// 	setNewsletterList(updatedList);
	// 	return () => {};
	// }, []);

	return (
		<Newsletter
			newsletterList={newsletterList}
			onTrashClick={onTrashClick}
			downloadExcel={downloadExcel}
		/>
	);
};

export default NewsletterContainer;
