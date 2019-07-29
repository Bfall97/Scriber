import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import '../vendor/mobileStepStyles.css'

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1
  }
})

function DotsMobileStepper (props) {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)

  function handleNext () {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  function handleBack () {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <MobileStepper
      variant="dots"
      steps={5}
      position="static"
      activeStep={activeStep}
      className={classes.root}
      id={'mobile-step'}
      nextButton={
        <Button size="small" onClick={() => { props.onStepClick(5); handleNext() }} disabled={activeStep === 4}>
            Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" onClick={() => { props.onStepClick(-5); handleBack() }} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
        </Button>
      }
    />
  )
}

export default DotsMobileStepper
