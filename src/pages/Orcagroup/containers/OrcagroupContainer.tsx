import React, { useCallback, useEffect, useState } from 'react';
import Orcagroup from '../Orcagroup';
import { Newsletters } from '@typedef/types';
import { getOrcaMembers, deleteOrcaMember } from 'src/api/OrcaMemberAPI';

import * as XLSX from 'xlsx';

type Props = {};

const OrcagroupContainer = (props: Props) => {
	const [orcagroupList, setOrcagroupList] = useState<Newsletters[]>([]);
	const downloadExcel = (data: Newsletters[]) => {
		// 데이터를 이차원 배열로 변환
		const dataArray = [
			['Index', 'ID', 'Email'], // 라벨 배열
			...data.map((orcagroup, index) => [
				index + 1,
				orcagroup.id,
				orcagroup.email,
			]),
		];
		// 워크북 생성
		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.aoa_to_sheet(dataArray);

		// 워크북에 워크시트 추가
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		// 엑셀 파일 생성 및 다운로드
		XLSX.writeFile(wb, 'orcagroup.xlsx');
	};
	const onTrashClick = useCallback(
		(id: number) => {
			setOrcagroupList((prevList: Newsletters[]) => {
				const updatedList = prevList.filter((orcagroup) => orcagroup.id !== id);
				return updatedList;
			});
			deleteOrcaMember(id);
		},
		[orcagroupList],
	);
	useEffect(() => {
		getOrcaMembers().then((data) => {
			console.log(data.data); // 나옴
			const updatedList = data.data;
			setOrcagroupList(updatedList);
		});

		return () => {};
	}, []);
	// useEffect(() => {
	// 	const updatedList = [];
	// 	for (let i = 0; i < 8; i++) {
	// 		const orcagroup = {
	// 			id: i + 1,
	// 			email: 'fjal;k@asfmdal.o.kr',
	// 		};
	// 		updatedList.push(orcagroup);
	// 	}
	// 	setOrcagroupList(updatedList);
	// 	return () => {};
	// }, []);

	return (
		<Orcagroup
			orcagroupList={orcagroupList}
			onTrashClick={onTrashClick}
			downloadExcel={downloadExcel}
		/>
	);
};

export default OrcagroupContainer;
