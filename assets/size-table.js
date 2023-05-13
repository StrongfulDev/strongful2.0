
window.addEventListener("DOMContentLoaded", function() {
	const sizeTable = document.querySelector(".size-guide-modal");
	const sizeTableToggler = document.querySelector(".size-table-toggler");
	const sizeTableOverlay = document.querySelector(".size-table-overlay");
	const sizeTableClose = document.querySelector(".StrongfulX");

	function closeSizeTable() {
		sizeTable.classList.add("hidden");
		sizeTableOverlay.classList.add("hidden");
	}

	function openSizeTable() {
		sizeTable.classList.remove("hidden");
		sizeTableOverlay.classList.remove("hidden");
	}

	sizeTableToggler.addEventListener("click", openSizeTable);
	sizeTableOverlay.addEventListener("click", closeSizeTable);
	sizeTableClose.addEventListener("click", closeSizeTable);
});
