import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import '../../styles/core.scss';
import css from './module-submit-cancel.scss';
import YesNo from '../yes-no/yes-no';
import { changeModuleEditorMode, changeModuleContent } from '../editor-content/editor-content-actions';

@styleable(css)
class ModuleSubmitCancel extends Component {
  static propTypes= {
		tempState: PropTypes.object,
		moduleId: PropTypes.string,
		changeModuleContent: PropTypes.func,
		changeModuleEditorMode: PropTypes.func
	};

	submit = () => {
		const { moduleId, tempState } = this.props;
		this.props.changeModuleContent({ id: moduleId, content: tempState });
		this.props.changeModuleEditorMode({ id: moduleId, bool: false });
	}

	cancel = () => {
		const { moduleId } = this.props;
		this.props.changeModuleEditorMode({ id: moduleId, bool: false });
	}

  render() {
    return (
      <div className={css.component} >
				<YesNo
					yesCallBack={this.submit}
					noCallBack={this.cancel}
				/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
		changeModuleContent,
		changeModuleEditorMode
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(ModuleSubmitCancel);
