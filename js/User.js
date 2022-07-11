class Name {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	static recoverName({ firstName, lastName }) {
		return new Name(firstName, lastName);
	}

	getName() {
		return `${this.firstName} ${this.lastName}`;
	}
}

class User {
	constructor(
		name,
		gender,
		birthday,
		id,
		email,
		phoneNumber,
		address,
		user,
		password,
		role
	) {
		this.name = name;
		this.gender = gender;
		this.setBirthday(birthday);
		this.id = id;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.user = user;
		this.password = password;
		this.role = role;
		this.status = 'inactive';
	}

	setBirthday(...birthday) {
		this.birthday = new Date(...birthday);
	}

	static recoverPerson({
		name,
		gender,
		birthday,
		id,
		email,
		phoneNumber,
		address,
		user,
		password,
		role,
	}) {
		return new Person(
			Name.recoverName(name),
			gender,
			birthday,
			id,
			email,
			phoneNumber,
			address,
			user,
			password,
			role
		);
	}

	activateAccount() {
		this.status = 'active';
	}
}
