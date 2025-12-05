import unittest
import os

from app import app, db, Product


class InstamartMiniTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """
        Run once before all tests.
        Configure the app to use an in-memory SQLite DB for testing.
        """
        # Use a separate, in-memory DB so tests don’t touch your real Postgres
        app.config["TESTING"] = True
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
        app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

        cls.app = app
        cls.client = app.test_client()

        with cls.app.app_context():
            db.create_all()

    @classmethod
    def tearDownClass(cls):
        """
        Run once after all tests.
        Drop all tables from the test DB.
        """
        with cls.app.app_context():
            db.drop_all()

    def test_home_route_status_code(self):
        """
        Check that the home page ("/") returns HTTP 200.
        """
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)

    def test_home_route_content(self):
        """
        Check that the home page returns expected text.
        Adjust the expected string if your index() returns HTML.
        """
        response = self.client.get("/")
        self.assertIn(b"Instamart", response.data)

    def test_create_product_model(self):
        """
        Verify that a Product can be created and saved to the DB.
        """
        with self.app.app_context():
            product = Product(name="Test Apple", price=1.99)
            db.session.add(product)
            db.session.commit()

            # Fetch from DB
            saved = Product.query.filter_by(name="Test Apple").first()
            self.assertIsNotNone(saved)
            self.assertEqual(saved.name, "Test Apple")
            self.assertAlmostEqual(saved.price, 1.99, places=2)


if __name__ == "__main__":
    unittest.main()
