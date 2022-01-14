import React from 'react'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
  logo: {
    display: 'flex',
    alignItems: 'center',
    color: '#333',
    fontFamily: 'Lato',
    fontSize: '2rem',
    fontWeight: 300,
  },
  icon: {
    height: '1.4em',
    width: 'auto',
    marginRight: '0.5rem',
  },
}))

interface Props {
  className?: string
}

const Logo: React.FC<Props> = ({ className }) => {
  const classes = useStyles()
  return (
    <span className={clsx(className, classes.logo)}>
      <img className={classes.icon} src="/bunjee.svg" alt="logo" />
      bunjee
    </span>
  )
}

export default Logo
