import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from '../../shared/database'

interface UserAtributes {
    id: number;
    email: string;
    password: string;
    createdAt?: Date;
    updateAt?: Date;
    role: string;
    tenantId: number;
}

interface UserCreatrionAttributes extends Optional<UserAtributes, 'id'> {}

export class User extends Model< UserAtributes, UserCreatrionAttributes> 
    implements UserAtributes {

        public id!: number;
        public email!: string;
        public password!: string
        public role!: string;
        public tenantId!: number
        public readonly createdAt!: Date;
        public readonly updateAt!: Date;

}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true, 
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        tenantId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true
    }
)