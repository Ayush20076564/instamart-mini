import unittest

from app import app, db, Item


class ItemCrudTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """
        Run once before all tests.
        Use a separate SQLite DB for testing.
        """
        app.config["TESTING"] = True
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///instamart_test.db"

        cls.app = app

        with cls.app.app_context():
            db.drop_all()
            db.create_all()

    @classmethod
    def tearDownClass(cls):
        """
        Run once after all tests.
        Clean up tables.
        """
        with cls.app.app_context():
            db.drop_all()

    def test_item_crud(self):
        """
        Simple CRUD: Create, Read, Update, Delete for Item model.
        """
        with self.app.app_context():
            # --- CREATE ---
            item = Item(name="Milk", price=2.5, quantity=10, image=None)
            db.session.add(item)
            db.session.commit()

            self.assertIsNotNone(item.id)

            # --- READ ---
            fetched = Item.query.get(item.id)
            self.assertIsNotNone(fetched)
            self.assertEqual(fetched.name, "Milk")
            self.assertEqual(fetched.price, 2.5)
            self.assertEqual(fetched.quantity, 10)

            # --- UPDATE ---
            fetched.price = 3.0
            fetched.quantity = 8
            db.session.commit()

            updated = Item.query.get(item.id)
            self.assertEqual(updated.price, 3.0)
            self.assertEqual(updated.quantity, 8)

            # --- DELETE ---
            db.session.delete(updated)
            db.session.commit()

            deleted = Item.query.get(item.id)
            self.assertIsNone(deleted)


if __name__ == "__main__":
    unittest.main()
