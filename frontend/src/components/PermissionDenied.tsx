const PermissionDenied = () => {
	localStorage.clear();
	return (
		<div className="tab1">
			<h2>Permission denied!</h2>
		</div>
	)
}

export default PermissionDenied
