<div class="view">
		<input class="toggle checked" type="checkbox" <%= completed ? 'checked' : '' %>>
		<div class="id"><%- order %></div>
		<input class="edit input-title title" value="<%- title %>" disabled title="Double clik to edit value">
		<input type="date" class="edit input-date date" value="<%- date %>" disabled title="Double clik to edit value">
		<button class="destroy"></button>
	</div>
</div>