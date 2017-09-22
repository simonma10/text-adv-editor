import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../../styles/core.scss';
import css from './modal.scss';
import { activateModal } from '../actions/modal-actions';

@styleable(css)
class Modal extends Component {
  static propTypes= {
    modalReducer: PropTypes.object,
		activateModal: PropTypes.func
  };

  canvasOnClick = () => {
		const { modalReducer } = this.props;
		if (modalReducer.canvasOnClick) {
			this.props.activateModal(false);
		}
	}

  render() {
		const { modalReducer } = this.props;
    return (
      <div className={css.component} >
				{
					modalReducer.activate && (
						<div>
							<div
								role="presentation"
								className={`${css.canvas} ${modalReducer.customStyle ? modalReducer.customStyle : ''}`}
								onClick={this.canvasOnClick}
							/>

							<ReactCSSTransitionGroup
								transitionName="modal-slide-down"
								transitionAppear
								transitionAppearTimeout={2000}
								transitionEnter={false}
								transitionLeave={false}
							>
								<div className={css.modal}>
									{modalReducer.content}
								</div>
							</ReactCSSTransitionGroup>
						</div>
					)
				}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    modalReducer: state.modalReducer
	};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
		activateModal
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
