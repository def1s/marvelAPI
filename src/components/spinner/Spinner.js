import spin from '../../resources/img/spinner.gif';

import './spinner.scss';

const Spinner = () => {
	return (
		<div className="spinner">

			<img src={spin} alt="" className="spinner__gif" style={{display: 'block', background: 'none'}}/>

		</div>
	);
}

export default Spinner;