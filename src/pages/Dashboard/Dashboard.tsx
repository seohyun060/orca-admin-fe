import React from 'react';
import images from 'src/assets/images';
import './styles/dashboard.styles.css';
import LineGraph from './components/LineGraph';
import Table from './components/Table';
import { StatisticsList } from '@typedef/types';
type Props = {
	statisticsList: StatisticsList | undefined;
	downloadAtExcel: () => void;
	graphList: any;
	onRangeClick: () => void;
	onGraphReload: () => void;
	onTableReload: () => Promise<void>;
	onStatisticReload: () => void;
	range: string;
	desktopData: number[];
	mobileData: number[];
	chartWidth: number;
};

const Dashboard = ({
	statisticsList,
	downloadAtExcel,
	graphList,
	onRangeClick,
	onGraphReload,
	onTableReload,
	onStatisticReload,
	range,
	desktopData,
	mobileData,
	chartWidth,
}: Props) => {
	return (
		<div className='dashboard'>
			<div className='dashboard-head'>
				<div className='title'>홈페이지 방문자 수 그래프</div>
				<div
					className='reload'
					onClick={() => {
						onGraphReload();
						onTableReload();
					}}
				>
					<img src={images.reload} />
					<div className='text'>Reload</div>
				</div>
				<div
					className='excel'
					onClick={() => {
						downloadAtExcel();
					}}
				>
					Excel download
				</div>
			</div>
			<div className='dashboard-analystic'>
				<LineGraph
					graphList={graphList}
					onRangeClick={onRangeClick}
					range={range}
					chartWidth={chartWidth}
				/>
				<Table desktopData={desktopData} mobileData={mobileData} />
			</div>
			<div className='dashboard-statistic'>
				<div className='dashboard-statistic-head'>
					<div className='title'>통계 리스트</div>
					<div
						className='reload'
						onClick={() => {
							onStatisticReload();
						}}
					>
						<img src={images.reload} />
						<div className='text'>Reload</div>
					</div>
				</div>
				<div className='dashboard-statistic-body'>
					<div className='people'>
						<div className='researcher'>
							<div className='researcher-head'>전체 연구자 수</div>
							<div className='researcher-body'>
								<div className='number'>{statisticsList?.researcherNumber}</div>
								<div className='unit'>명</div>
							</div>
						</div>
						<div className='newsletter'>
							<div className='newsletter-head'>뉴스레터 구독 신청자 수</div>
							<div className='newsletter-body'>
								<div className='number'>{statisticsList?.newsletterNumber}</div>
								<div className='unit'>명</div>
							</div>
						</div>
						<div className='orcagroup'>
							<div className='orcagroup-head'>ORCA 그룹 가입 신청자 수</div>
							<div className='orcagroup-body'>
								<div className='number'>{statisticsList?.orcagroupNumber}</div>
								<div className='unit'>명</div>
							</div>
						</div>
					</div>
					<div className='document'>
						<div className='project'>
							<div className='project-head'>프로젝트 상태</div>
							<div className='project-body'>
								<div className='active'>
									{statisticsList?.projectStatus.active !== 0 ? (
										<div className='active-nonzero'>
											<div className='number'>
												{statisticsList?.projectStatus.active}
											</div>
											<div className='unit'>건</div>
										</div>
									) : (
										<div className='active-zero'>-</div>
									)}
									<div className='active-title'>Active</div>
								</div>
								<div className='completed'>
									{statisticsList?.projectStatus.completed !== 0 ? (
										<div className='completed-nonzero'>
											<div className='number'>
												{statisticsList?.projectStatus.completed}
											</div>
											<div className='unit'>건</div>
										</div>
									) : (
										<div className='completed-zero'>-</div>
									)}
									<div className='completed-title'>Completed</div>
								</div>
								<div className='terminated'>
									{statisticsList?.projectStatus.terminated !== 0 ? (
										<div className='terminated-nonzero'>
											<div className='number'>
												{statisticsList?.projectStatus.terminated}
											</div>
											<div className='unit'>건</div>
										</div>
									) : (
										<div className='terminated-zero'>-</div>
									)}
									<div className='terminated-title'>Terminated</div>
								</div>
							</div>
						</div>
						<div className='event'>
							<div className='event-head'>이벤트 상태</div>
							<div className='event-body'>
								<div className='last'>
									{statisticsList?.eventStatus.lastEvent !== 0 ? (
										<div className='last-nonzero'>
											<div className='number'>
												{statisticsList?.eventStatus.lastEvent}
											</div>
											<div className='unit'>건</div>
										</div>
									) : (
										<div className='last-zero'>-</div>
									)}
									<div className='last-title'>지난 이벤트</div>
								</div>
								<div className='upcoming'>
									{statisticsList?.eventStatus.upcomingEvent !== 0 ? (
										<div className='upcoming-nonzero'>
											<div className='number'>
												{statisticsList?.eventStatus.upcomingEvent}
											</div>
											<div className='unit'>건</div>
										</div>
									) : (
										<div className='upcoming-zero'>-</div>
									)}
									<div className='upcoming-title'>예정 이벤트</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
