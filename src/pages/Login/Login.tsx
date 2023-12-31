import React from 'react';
import './styles/login.styles.css';
import images from 'src/assets/images';
import { EChange } from '@typedef/types';
import Example from './Example';
type Props = {
	id: string;
	password: string;
	onChangeId: (e: EChange) => void;
	onChangePassword: (e: EChange) => void;
	onLoginClicked: (e: any) => void;
};

const Login = ({
	id,
	password,
	onChangeId,
	onChangePassword,
	onLoginClicked,
}: Props) => {
	return (
		<div className='login'>
			<div className='login-container'>
				<img src={images.logo} />
				<div className='title'>ORCA ADMIN</div>
				<form onSubmit={(e) => onLoginClicked(e)}>
					<input
						className='id'
						type='id'
						id='id'
						value={id}
						placeholder='ID'
						required
						autoFocus
						onChange={onChangeId}
					></input>
					<input
						className='pw'
						type='password'
						value={password}
						placeholder='PASSWORD'
						required
						onChange={onChangePassword}
					></input>
					<button type='submit'>Login</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
