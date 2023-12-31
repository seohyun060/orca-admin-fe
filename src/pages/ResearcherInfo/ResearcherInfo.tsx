import React, { ChangeEvent, ChangeEventHandler } from 'react';
import './styles/researcherinfo.styles.css';
import Map from './components/Map';
import images from 'src/assets/images';
import { EChange, OnApplyClicked, Publication } from '@typedef/types';
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
type Props = {
	//edit: boolean;
	id: number;
	mapDisplay: boolean;
	onMapDisplayClicked: () => void;
	dropbox: boolean;
	onDropboxClicked: () => void;
	nameEdit: string;
	departmentEdit: string;
	projectEdit: string;
	onChangeNameEdit: (e: EChange) => void;
	onChangeDepartmentEdit: (e: EChange) => void;
	onChangeProjectEdit: (e: EChange) => void;
	selectedProfile: File | null;
	uploadProfileHandler: (event: ChangeEvent<HTMLInputElement>) => void;
	profile: string;
	linkEdit: string;
	twitterEdit: string;
	biographyEdit: string;
	onChangeLinkEdit: (e: EChange) => void;
	onChangeTwitterEdit: (e: EChange) => void;
	onChangeBiographyEdit: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	publicationEdit: Publication[];
	//onChangePublicationEdit: (e: EChange, index: number) => void;
	locationEdit: number;
	onLocationClicked: (mapNumber: number) => void;
	onAddClicked: () => void;
	onApplyClicked: OnApplyClicked;
	onChangePubEdit: (e: EChange, index: number, type: number) => void;
	pubEdit: boolean;
	onClickPubEdit: (index: number) => void;
	onSubClicked: (index: number) => void;
	onEnterKeyPress: any;
};

const ResearcherInfo = ({
	//edit,
	id,
	mapDisplay,
	onMapDisplayClicked,
	dropbox,
	onDropboxClicked,
	nameEdit,
	departmentEdit,
	projectEdit,
	onChangeNameEdit,
	onChangeDepartmentEdit,
	onChangeProjectEdit,
	selectedProfile,
	uploadProfileHandler,
	profile,
	linkEdit,
	twitterEdit,
	biographyEdit,
	onChangeLinkEdit,
	onChangeTwitterEdit,
	onChangeBiographyEdit,
	publicationEdit,
	//onChangePublicationEdit,
	locationEdit,
	onLocationClicked,
	onAddClicked,
	onApplyClicked,
	onChangePubEdit,
	pubEdit,
	onClickPubEdit,
	onSubClicked,
	onEnterKeyPress,
}: Props) => {
	const mapItems = Array.from({ length: 32 }, (_, index) => index + 1);
	const navigate = useNavigate();
	return (
		<div className='researcherinfo'>
			<ToastContainer />
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onApplyClicked(
						//edit,
						id,
						locationEdit,
						nameEdit,
						departmentEdit,
						projectEdit,
						selectedProfile,
						linkEdit,
						twitterEdit,
						biographyEdit,
						publicationEdit,
					);

					window.scrollTo(0, 0);
				}}
			>
				<div className='researcherinfo-head'>
					<div>사용자 추가 / 편집</div>
					<button
						// onClick={() => {
						// 	onApplyClicked(
						// 		//edit,
						// 		id,
						// 		locationEdit,
						// 		nameEdit,
						// 		departmentEdit,
						// 		projectEdit,
						// 		selectedProfile,
						// 		linkEdit,
						// 		twitterEdit,
						// 		biographyEdit,
						// 		publicationEdit,
						// 	);

						// 	window.scrollTo(0, 0);
						// }}
						type='submit'
					>
						적용
					</button>
				</div>
				<div className='researcherinfo-map'>
					<div
						className='map-button'
						onClick={() => {
							onMapDisplayClicked();
						}}
					>
						<div>연구자 세계지도 추가 위치 번호</div>

						<img src={mapDisplay ? images.up_w : images.down_w} />
					</div>
					{mapDisplay ? (
						<>
							<div className='map-body'>
								{mapItems.map((item) => (
									<div key={item} className='grid-item'>
										{item}
									</div>
								))}
							</div>
							<Map />
						</>
					) : (
						''
					)}
				</div>
				<div className='divider' />
				<div className='researcherinfo-body'>
					<div className='numbering'>
						<div className='text'>세계지도 위치 번호</div>

						<div className='dropdown-button' onClick={onDropboxClicked}>
							<div className='location'>{locationEdit}</div>
							<img src={dropbox ? images.up_b : images.down_b} />
						</div>
						{dropbox ? (
							<div className='dropdown-container'>
								<div className='dropdown-content'>
									{mapItems.map((item) => (
										<div
											key={item}
											className='dropdown-item'
											onClick={() => {
												onLocationClicked(item);
											}}
										>
											{item}
										</div>
									))}
								</div>
							</div>
						) : (
							''
						)}
					</div>
					<div className='info'>
						<div className='name'>
							<div className='text'>이름</div>
							<input
								onChange={onChangeNameEdit}
								required
								maxLength={255}
								value={nameEdit}
							></input>
						</div>
						<div className='department'>
							<div className='text'>소속</div>
							<input
								onChange={onChangeDepartmentEdit}
								required
								value={departmentEdit}
								maxLength={255}
							></input>
						</div>
						<div className='project'>
							<div className='text'>프로젝트</div>
							<input
								onChange={onChangeProjectEdit}
								required
								value={projectEdit}
								maxLength={255}
							></input>
						</div>
					</div>
					<div className='profile-image'>
						<label htmlFor='mainInput'>
							<img src={images.download} alt='Upload' />
							<div className='text'>User profile Image</div>
							{selectedProfile ? <p>{selectedProfile.name}</p> : ''}
							<input
								type='file'
								id='mainInput'
								onChange={uploadProfileHandler}
								style={{ display: 'none' }}
							/>
						</label>
					</div>
					<div className='link'>
						<div className='text'>Link</div>
						<img src={images.link} />
						<input
							onChange={onChangeLinkEdit}
							value={linkEdit}
							maxLength={255}
						></input>
					</div>
					<div className='twitter'>
						<div className='text'>Twitter</div>
						<img src={images.link} />
						<input
							onChange={onChangeTwitterEdit}
							value={twitterEdit}
							maxLength={255}
						></input>
					</div>
					<div className='biography'>
						<div className='head'>Biography</div>
						<textarea
							onChange={onChangeBiographyEdit}
							value={biographyEdit}
							style={{ whiteSpace: 'pre-line' }}
						></textarea>
					</div>
					<div className='publication'>
						<div className='head'>Publications</div>
						{publicationEdit.length === 0 ? (
							<div className='container'>
								<div className='linkbox'>
									<div className='linkbox-input'>
										<img src={images.link} />
										<input
											className='body'
											onChange={(e) => onChangePubEdit(e, 0, 0)}
											maxLength={255}
											value={''}
											required
										/>
									</div>
									<img
										className='add'
										src={images.add}
										onClick={onAddClicked}
									></img>
									<div className='info'>
										<div className='info-title'>
											<div className='header'>논문제목</div>
											<div className='stroke'></div>
											<input
												className='body'
												onChange={(e) => onChangePubEdit(e, 0, 1)}
												maxLength={255}
												value={''}
												required
											/>
										</div>
										<div className='info-author'>
											<div className='header'>저자명</div>
											<div className='stroke'></div>
											<input
												className='body'
												onChange={(e) => onChangePubEdit(e, 0, 2)}
												maxLength={255}
												value={''}
											/>
											<img
												src={
													publicationEdit[0].editable
														? images.pen_w
														: images.pen_b
												}
												onClick={() => {
													onClickPubEdit(0);
												}}
											/>
										</div>
										<div className='info-yjc'>
											<div className='y'>
												<div className='header'>출판연도</div>
												<div className='stroke'></div>
												<input
													className='body'
													onChange={(e) => {
														const inputValue = e.target.value;
														// 숫자 형태의 문자열만 허용하는 정규식
														const numericRegex = /^\d*$/;

														if (numericRegex.test(inputValue)) {
															// 입력값이 숫자 형태의 문자열이라면 onChange 호출
															onChangePubEdit(e, 0, 3);
														}
													}}
													required
													maxLength={4}
													value={''}
												/>
											</div>
											<div className='j'>
												<div className='header'>저널</div>
												<div className='stroke'></div>
												<input
													className='body'
													onChange={(e) => onChangePubEdit(e, 0, 4)}
													maxLength={255}
													value={''}
												/>
											</div>
											<div className='c'>
												<div className='header'>컨퍼런스 명</div>
												<div className='stroke'></div>
												<input
													className='body'
													onChange={(e) => onChangePubEdit(e, 0, 5)}
													maxLength={255}
													value={''}
												/>
											</div>
										</div>
										<div className='info-ho'>
											<div className='header'>권 (호)</div>
											<div className='stroke'></div>
											<input
												className='body'
												onChange={(e) => onChangePubEdit(e, 0, 6)}
												maxLength={255}
												value={''}
											/>
										</div>
									</div>
								</div>
							</div>
						) : (
							publicationEdit.map((publication, index) => (
								<div key={index} className='container'>
									<div className='linkbox'>
										<div className='linkbox-input'>
											<img src={images.link} />
											<input
												className='body'
												onChange={(e) => onChangePubEdit(e, index, 0)}
												value={publicationEdit[index].link}
												maxLength={255}
											/>
										</div>
										{index === publicationEdit.length - 1 ? (
											<img
												className='add'
												src={images.add}
												onClick={onAddClicked}
											></img>
										) : (
											<img
												className='sub'
												src={images.sub}
												onClick={() => {
													onSubClicked(index);
												}}
											></img>
										)}
									</div>
									<div className='info'>
										<div className='info-title'>
											<div className='header'>논문제목</div>
											<div className='stroke'></div>
											<input
												className='body'
												onChange={(e) => onChangePubEdit(e, index, 1)}
												value={publicationEdit[index].title}
												maxLength={255}
											/>
										</div>
										<div className='info-author'>
											<div className='header'>저자명</div>
											<div className='stroke'></div>
											<input
												className='body'
												onChange={(e) => onChangePubEdit(e, index, 2)}
												value={publicationEdit[index].author}
												maxLength={255}
											/>
											<img
												src={
													publicationEdit[index].editable
														? images.pen_w
														: images.pen_b
												}
												onClick={() => {
													onClickPubEdit(index);
												}}
											/>
										</div>
										<div className='info-yjc'>
											<div className='y'>
												<div className='header'>출판연도</div>
												<div className='stroke'></div>
												<input
													className='body'
													maxLength={4}
													onChange={(e) => {
														const inputValue = e.target.value;
														// 숫자 형태의 문자열만 허용하는 정규식
														const numericRegex = /^\d*$/;

														if (numericRegex.test(inputValue)) {
															// 입력값이 숫자 형태의 문자열이라면 onChange 호출
															onChangePubEdit(e, index, 3);
														}
													}}
													value={
														publicationEdit[index].pubYear
															? publicationEdit[index].pubYear
															: ''
													}
												/>
											</div>
											<div className='j'>
												<div className='header'>저널</div>
												<div className='stroke'></div>
												<input
													className='body'
													onChange={(e) => onChangePubEdit(e, index, 4)}
													value={publicationEdit[index].journal}
													maxLength={255}
												/>
											</div>
											<div className='c'>
												<div className='header'>컨퍼런스 명</div>
												<div className='stroke'></div>
												<input
													className='body'
													onChange={(e) => onChangePubEdit(e, index, 5)}
													value={publicationEdit[index].conference}
													maxLength={255}
												/>
											</div>
										</div>
										<div className='info-ho'>
											<div className='header'>권 (호)</div>
											<div className='stroke'></div>
											<input
												className='body'
												onChange={(e) => onChangePubEdit(e, index, 6)}
												value={publicationEdit[index].volume}
												maxLength={255}
											/>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default ResearcherInfo;
